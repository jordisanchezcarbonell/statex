"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useRef, useState } from "react";
import type { team } from "./content";
import { caps, focus, muted } from "./ui";
import styles from "./FounderTeam.module.css";

const Lanyard = dynamic(() => import("../_components/lanyard/Lanyard"), { ssr: false });

function FounderCard({ name, front }: { name: string; front: string }) {
  const scene = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [compact, setCompact] = useState(false);
  const [reduce, setReduce] = useState(true);
  const [ready, setReady] = useState(false);
  const [flipSignal, setFlipSignal] = useState(0);
  const [back, setBack] = useState(false);
  const helpId = useId();

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 760px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { setCompact(mobile.matches); setReduce(motion.matches); };
    sync();
    mobile.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNear(true); observer.disconnect(); }
    }, { rootMargin: "250px" });
    if (scene.current) observer.observe(scene.current);
    return () => { observer.disconnect(); mobile.removeEventListener("change", sync); motion.removeEventListener("change", sync); };
  }, []);

  const live = near && !reduce;
  return (
    <div className={styles.cardColumn}>
      <div ref={scene} className={styles.scene} role="group" aria-label={`Tarjeta de ${name}`} aria-describedby={helpId}>
        {(!live || !ready) && <div className={styles.staticCard}>
          <span className={styles.staticStrap} aria-hidden="true" />
          <img src={back ? "/lanyard/back.svg" : front} width={1350} height={960} alt={back ? "Reverso de StateX: La seguridad no se presupone. Se demuestra." : `Tarjeta de ${name}, cofundador de StateX, Barcelona`} />
        </div>}
        {live && <div className={styles.canvas} style={{ opacity: ready ? 1 : 0 }}>
          <Lanyard frontImage={front} backImage="/lanyard/back.svg" strapImage="/lanyard/strap.svg" orientation="landscape" cardColor="#101112" cornerRadius={0} finish="matte" size={compact ? 0.44 : 0.46} strapLength={0.3} breeze={0} damping={0.72} intro={false} flipSignal={flipSignal} pixelRatioCap={compact ? 1.5 : 2} onReady={() => setReady(true)} />
        </div>}
      </div>
      <div className={styles.cardFoot}>
        <p id={helpId}>{reduce ? "Tarjeta de StateX" : <><span className={styles.desktopHint}>Arrastra para explorar · Haz clic para girar</span><span className={styles.mobileHint}>Arrastra la tarjeta · Toca para girar</span></>}</p>
        <button type="button" className={focus} onClick={() => { setBack((v) => !v); setFlipSignal((v) => v + 1); }} aria-label={`Girar tarjeta de ${name}`}>Girar <span aria-hidden="true">↻</span></button>
      </div>
    </div>
  );
}

export function FounderTeam({ data }: { data: typeof team }) {
  const [selected, setSelected] = useState(0);
  const panelId = useId();
  const founder = data.founders[selected];
  const front = founder.name.startsWith("Albert") ? "/lanyard/albert.svg" : "/lanyard/front.svg";

  return (
    <div className={styles.team}>
      <div className={styles.selector} role="group" aria-label="Conoce a los fundadores">
        {data.founders.map((person, index) => <button key={person.name} type="button" aria-pressed={selected === index} aria-controls={panelId} onClick={() => setSelected(index)} className={focus}>
          <span className={styles.index}>0{index + 1}</span>{person.name}<span className={styles.selectedMark} aria-hidden="true">↗</span>
        </button>)}
      </div>
      <div className={styles.bio} id={panelId}>
        {data.founders.map((person, index) => <article key={person.name} hidden={selected !== index} aria-label={person.name}>
          <h3 className={`${caps} ${styles.name}`}>{person.name}</h3>
          <p className={`${muted} ${styles.role}`}>{person.role}</p>
          {person.bio && <p className={styles.text}>{person.bio}</p>}
          {person.duty && <p className={`${styles.text} ${muted}`}>{person.duty}</p>}
          <ul className={styles.links}>{person.links.map((link) => <li key={link.url}><a href={link.url} target="_blank" rel="noopener noreferrer" className={focus}>{link.label} <span aria-hidden="true">↗</span><span className="sr-only"> de {person.name} (se abre en una pestaña nueva)</span></a></li>)}</ul>
        </article>)}
      </div>
      <FounderCard key={founder.name} name={founder.name} front={front} />
      <div className={styles.experience}>
        <h3 className={muted}>{data.experienceLabel}</h3>
        <ul>{data.experience.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </div>
  );
}
