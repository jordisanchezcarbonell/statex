// Uses an existing local Puppeteer install; no download or dependency changes.
// STATEX_PUPPETEER_MODULE: absolute module path; STATEX_BROWSER: Chrome executable.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const { default: puppeteer } = await import(pathToFileURL(process.env.STATEX_PUPPETEER_MODULE).href);
const base = process.env.STATEX_BLOG_ORIGIN ?? "http://127.0.0.1:3100";
assert.match(base, /^http:\/\/(127\.0\.0\.1|localhost):\d+$/);
const path = "/blog/ia-local-actualizar-dependencia";
const output = "docs/capturas/blog";
await mkdir(output, { recursive: true });
const browser = await puppeteer.launch({ executablePath: process.env.STATEX_BROWSER, headless: true });
const findings = { viewports: [], errors: [], links: [], anchors: [], privacy: [], words: 0 };
try {
  const page = await browser.newPage();
  page.on("pageerror", (e) => findings.errors.push(e.message));
  // Test only our own site. External sources are verified separately by reading them.
  await page.setRequestInterception(true);
  page.on("request", (r) => new URL(r.url()).origin === base || /^(data:|blob:)/.test(r.url()) ? r.continue() : r.abort());
  await page.setViewport({ width: 1440, height: 1000 });
  assert.equal((await page.goto(base + path, { waitUntil: "networkidle0" })).status(), 200);
  const info = await page.evaluate(() => {
    const body = document.querySelector("[data-article-body]");
    const text = body.innerText;
    return {
      words: text.trim().split(/\s+/u).length,
      title: document.querySelector("h1").innerText,
      author: document.querySelector('meta[name="author"]')?.content,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      og: document.querySelector('meta[property="og:image"]')?.content,
      schema: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent)),
      text,
      links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
    };
  });
  findings.words = info.words;
  assert.ok(info.words >= 900 && info.words <= 1200, `Article words: ${info.words}`);
  assert.equal(info.author, "Jordi Sánchez");
  assert.ok(info.canonical.endsWith(path));
  assert.ok(info.og.includes(path + "/opengraph-image"));
  const imageUrl = new URL(info.og);
  const imageResponse = await fetch(base + imageUrl.pathname + imageUrl.search);
  assert.equal(imageResponse.status, 200);
  assert.match(imageResponse.headers.get("content-type"), /^image\/png/);
  findings.socialImage = { status: imageResponse.status, contentType: imageResponse.headers.get("content-type") };
  assert.ok(info.schema.some((s) => s["@type"] === "BlogPosting" && s.author.name === "Jordi Sánchez"));
  assert.ok(!/\/Users\/|\/private\/|statex-ai-remediation-lab|response\.raw|canary|sha256:/i.test(info.text));
  assert.ok(info.links.every((href) => !href.startsWith("//")));
  assert.ok(info.text.includes("seguridad sigue inconclusa"));
  await page.screenshot({ path: `${output}/articulo-escritorio.png`, fullPage: true });

  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewport({ width, height: 900 });
    await page.goto(base + path, { waitUntil: "networkidle0" });
    const measured = await page.evaluate(() => ({
      width: window.innerWidth, scrollWidth: document.documentElement.scrollWidth,
      headerOverflow: [...document.querySelectorAll("header a, header button")].filter((el) => {
        const b = el.getBoundingClientRect(); return b.width && b.height && (b.left < -1 || b.right > window.innerWidth + 1);
      }).map((el) => el.textContent.trim()),
      diagramColumns: getComputedStyle(document.querySelector("figure ol")).gridTemplateColumns.split(" ").length,
    }));
    assert.ok(measured.scrollWidth <= width, JSON.stringify(measured));
    assert.deepEqual(measured.headerOverflow, [], JSON.stringify(measured));
    assert.equal(measured.diagramColumns, width < 768 ? 1 : 3);
    findings.viewports.push(measured);
    if (width === 375) {
      await page.screenshot({ path: `${output}/articulo-movil.png`, fullPage: true });
      await page.screenshot({ path: `${output}/articulo-movil-cabecera.png` });
      await page.click('button[aria-expanded="false"]');
      const nav = await page.$('nav[aria-label="Principal (móvil)"] a[href="/blog"]');
      assert.ok(nav);
      await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), nav.click()]);
      assert.equal(new URL(page.url()).pathname, "/blog");
      await page.screenshot({ path: `${output}/indice-movil.png`, fullPage: true });
    }
  }
  const internal = [...new Set(info.links.filter((href) => href.startsWith("/")).map((href) => href.split("#")[0]))];
  for (const route of internal) {
    const response = await fetch(base + route);
    findings.links.push({ route, status: response.status });
    assert.equal(response.status, 200, route);
  }
  for (const href of [...new Set(info.links.filter((href) => href.includes("#") && (href.startsWith("/") || href.startsWith("#"))))]) {
    const target = new URL(href, base + path);
    await page.goto(base + target.pathname, { waitUntil: "networkidle0" });
    const exists = await page.evaluate((id) => Boolean(document.getElementById(id)), decodeURIComponent(target.hash.slice(1)));
    findings.anchors.push({ href, exists });
    assert.ok(exists, href);
  }
  for (const route of ["/", "/blog"]) {
    await page.goto(base + route, { waitUntil: "networkidle0" });
    assert.ok(await page.$('header a[href="/blog"]'));
    assert.ok(await page.$('footer a[href="/blog"]'));
  }
  for (const route of ["/statex-ai-remediation-lab/reports/observed.md", "/reports/evidence/local-model-9f2372e1b77448169ac43baca9b75744/report.json", "/blog/evidence", "/blog/ia-local-actualizar-dependencia/response.raw.txt"]) {
    const response = await fetch(base + route);
    findings.privacy.push({ route, status: response.status });
    assert.equal(response.status, 404, route);
  }
  assert.deepEqual(findings.errors, []);
  findings.passed = true;
} finally {
  await browser.close();
  await writeFile(`${output}/checks.json`, JSON.stringify(findings, null, 2) + "\n");
}
console.log(JSON.stringify(findings, null, 2));
