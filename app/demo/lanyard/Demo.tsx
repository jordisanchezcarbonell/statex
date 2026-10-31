"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, RotateCcw, Rotate3D } from "lucide-react";
import styles from "./demo.module.css";

const Lanyard = dynamic(() => import("../../_components/lanyard/Lanyard"), {
  ssr: false,
  loading: () => <div className={styles.loading}><img src="/lanyard/front.svg" alt="Tarjeta negra de StateX" /><span>Preparando tu credencial…</span></div>,
});

export default function Demo() {
  const [version, setVersion] = useState(0);
  const [flipSignal, setFlipSignal] = useState(0);
  const [finish, setFinish] = useState<"glossy" | "matte">("matte");
  const [member, setMember] = useState("jordi");
  const [compact, setCompact] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 760px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { setCompact(mobile.matches); setReduce(motion.matches); };
    sync();
    mobile.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => { mobile.removeEventListener("change", sync); motion.removeEventListener("change", sync); };
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.brand} aria-label="StateX, inicio">StateX<span>®</span></a>
        <span className={styles.label}><i /> INDEPENDENT SECURITY STUDIO</span>
        <a href="/" className={styles.back}>Volver al sitio <ArrowUpRight size={15} /></a>
      </header>
      <section className={styles.content} aria-labelledby="lanyard-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}><span>01 /</span> IDENTIDAD EN MOVIMIENTO</p>
          <h1 id="lanyard-title">La seguridad<br />tiene <em>carácter.</em></h1>
          <p className={styles.description}>La seguridad no se presupone.<br /> Se demuestra.</p>
          <a href="/#contacto" className={styles.cta}>Hablemos de tu proyecto <ArrowUpRight size={18} /></a>
          <div className={styles.signature}><span className={styles.signatureMark} aria-hidden="true">↗</span><p>Una mirada independiente.<br /><span>Una forma propia de hacer las cosas.</span></p></div>
        </div>
        <div className={styles.experiment}>
          <div className={styles.stage} role="group" aria-label="Credencial 3D de StateX" aria-describedby="lanyard-help">
            <div className={styles.stageTop}><span>OBJECT — 001</span><label className={styles.memberLabel}><span className={styles.srOnly}>Tarjeta de</span><select aria-label="Titular de la tarjeta" value={member} onChange={(event) => setMember(event.target.value)}><option value="jordi">Jordi Sánchez</option><option value="albert">Albert Sánchez</option></select></label></div>
            <span className={styles.verticalLabel} aria-hidden="true">SECURITY WITH CHARACTER</span>
            <div className={styles.halo} aria-hidden="true" />
            <div className={styles.canvas}>
              <Lanyard key={`${version}-${reduce}`} frontImage={member === "jordi" ? "/lanyard/front.svg" : "/lanyard/albert.svg"} backImage="/lanyard/back.svg" strapImage="/lanyard/strap.svg" orientation="landscape" cardColor="#101112" cornerRadius={0} finish={finish} size={compact ? 0.44 : 0.42} strapLength={compact ? 0.30 : 0.35} breeze={0} damping={0.72} intro={false} interactive={!reduce} flipSignal={flipSignal} pixelRatioCap={compact ? 1.5 : 2} />
            </div>
            <p id="lanyard-help" className={styles.hint}><span className={styles.hintDot} />{reduce ? "Movimiento reducido · Usa el botón para ver el reverso" : <><span className={styles.desktopHint}>Arrastra para explorar · Haz clic para girar</span><span className={styles.mobileHint}>Mueve la tarjeta con el dedo · Toca para girar</span></>}</p>
          </div>
          <div className={styles.toolbar}>
            <div className={styles.finishes} role="group" aria-label="Acabado de la credencial"><button aria-pressed={finish === "glossy"} onClick={() => setFinish("glossy")}><span className={styles.glossSwatch} />Brillo</button><button aria-pressed={finish === "matte"} onClick={() => setFinish("matte")}><span className={styles.matteSwatch} />Mate</button></div>
            <div className={styles.actions}><button onClick={() => setFlipSignal((v) => v + 1)}><Rotate3D size={16} /><span>Girar</span></button><button onClick={() => setVersion((v) => v + 1)} aria-label="Reiniciar posición de la tarjeta" title="Reiniciar posición"><RotateCcw size={15} /></button></div>
          </div>
        </div>
      </section>
      <footer className={styles.footer}><span><span className={styles.statusDot} /> SEGURIDAD CON CRITERIO.</span><a href="https://reactbits.dev/components/lanyard" target="_blank" rel="noreferrer">INTERACCIÓN / REACT BITS <ArrowUpRight size={12} /></a><span className={styles.footerEnd}>EXPLORA EL OTRO LADO <ArrowDown size={12} /></span></footer>
    </main>
  );
}
