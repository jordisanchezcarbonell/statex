import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Todas las páginas se generan en build y no hay revalidación (ISR): basta la caché de solo lectura
// sobre los assets estáticos. Sin R2 ni KV, así el plan gratuito no necesita recursos extra.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
