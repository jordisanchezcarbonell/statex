"use client";

import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { sendContact, type ContactState } from "../../actions/contact";
import { contactForm as t } from "../content";

const INTEREST_EVENT = "statex:interest";
const initial: ContactState = { status: "idle" };

const label = "block font-bold text-[16px]";
const input =
  "mt-2 block w-full min-h-12 border-[3px] border-black bg-white px-3 py-2 text-[17px] text-black placeholder:text-black/50 focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--e-cobalt)] aria-[invalid=true]:border-[#B81F18]";
const errorText = "mt-1 text-[15px] font-semibold text-[#8A1712]";

/** Enlace de oferta: preselecciona el interés en el formulario y lleva a #contacto. */
export function OfferLink({ interest, children, className = "" }: { interest: string; children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const pressed = { x: 6, y: 6, boxShadow: "0px 0px 0px 0px #000" };
  return (
    <motion.a
      href="#contacto"
      onClick={() => window.dispatchEvent(new CustomEvent(INTEREST_EVENT, { detail: interest }))}
      initial={false}
      style={{ boxShadow: "6px 6px 0px 0px #000" }}
      whileHover={reduce ? undefined : pressed}
      whileTap={reduce ? undefined : pressed}
      transition={{ type: "spring", stiffness: 700, damping: 32 }}
      className={`inline-flex min-h-12 items-center justify-center border-[3px] border-black px-5 font-bold leading-none focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[var(--e-cobalt)] ${className}`}
    >
      {children}
    </motion.a>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const [interest, setInterest] = useState("evaluacion-inicial");
  const status = useRef<HTMLParagraphElement>(null);
  const fe = state.fieldErrors ?? {};
  const v = state.values;

  useEffect(() => {
    const onInterest = (e: Event) => setInterest((e as CustomEvent<string>).detail);
    window.addEventListener(INTEREST_EVENT, onInterest);
    return () => window.removeEventListener(INTEREST_EVENT, onInterest);
  }, []);

  useEffect(() => {
    if (state.status !== "idle") status.current?.focus();
    if (state.values?.service) setInterest(state.values.service);
  }, [state]);

  if (state.status === "ok") {
    return (
      <div className="border-[3px] border-black bg-white p-6 sm:p-8">
        <p ref={status} tabIndex={-1} role="status" className="m-0 text-[clamp(1.4rem,2.4vw,2rem)] font-extrabold leading-tight outline-none">
          {t.success}
        </p>
      </div>
    );
  }

  const err = (k: keyof typeof fe) =>
    fe[k] ? (
      <p id={`cf-${k}-err`} className={errorText}>
        {fe[k]}
      </p>
    ) : null;
  const aria = (k: keyof typeof fe) => ({ "aria-invalid": fe[k] ? true : undefined, "aria-describedby": fe[k] ? `cf-${k}-err` : undefined });

  return (
    <form action={action} noValidate className="relative border-[3px] border-black bg-white p-6 shadow-[6px_6px_0_0_#000] sm:p-8">
      <h3 className="m-0 font-[family-name:var(--e-sans)] text-[clamp(1.6rem,2.6vw,2.25rem)] font-extrabold leading-none tracking-[-0.03em]">
        {t.title}
      </h3>

      {(state.status === "error" || state.status === "invalid" || state.status === "not-configured") && (
        <p
          ref={status}
          tabIndex={-1}
          role="alert"
          className={`m-0 mt-5 border-[3px] px-3 py-2 font-semibold outline-none ${
            state.status !== "not-configured" ? "border-[#B81F18] text-[#8A1712]" : "border-dashed border-black"
          }`}
        >
          {state.status !== "not-configured" ? t.error : t.notConfigured}
        </p>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>{t.fields.name}</label>
          <input id="cf-name" name="name" defaultValue={v?.name} autoComplete="name" required maxLength={120} className={input} {...aria("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="cf-company" className={label}>{t.fields.company}</label>
          <input id="cf-company" name="company" defaultValue={v?.company} autoComplete="organization" required maxLength={160} className={input} {...aria("company")} />
          {err("company")}
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>{t.fields.email}</label>
          <input id="cf-email" name="email" defaultValue={v?.email} type="email" autoComplete="email" required maxLength={200} className={input} {...aria("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="cf-role" className={label}>{t.fields.role}</label>
          <input id="cf-role" name="role" autoComplete="organization-title" maxLength={120} className={input} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-interest" className={label}>{t.fields.interest}</label>
          {/* No controlado: React 19 reinicia el formulario tras la acción y un select controlado
              quedaría desincronizado. key fuerza el remontaje cuando una oferta cambia el interés. */}
          <select
            key={interest}
            id="cf-interest"
            name="service"
            defaultValue={interest}
            className={input}
            {...aria("service")}
          >
            {t.interestOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {err("service")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className={label}>{t.fields.message}</label>
          <textarea id="cf-message" name="message" defaultValue={v?.message} required rows={5} maxLength={4000} className={`${input} resize-y`} {...aria("message")} />
          {err("message")}
        </div>
      </div>

      {/* Campo trampa para bots: invisible para personas y lectores de pantalla */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-website">No rellenar</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 text-[16px]">
          <input name="consent" type="checkbox" className="mt-1 size-5 shrink-0 accent-black" {...aria("consent")} />
          <span>{t.consent}</span>
        </label>
        {err("consent")}
        <p className="m-0 mt-2 font-[family-name:var(--e-mono)] text-[13px]">{t.privacyPending}</p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-8 inline-flex min-h-14 items-center border-[3px] border-black bg-[var(--e-cobalt)] px-6 text-[18px] font-bold text-white shadow-[6px_6px_0_0_#000] transition-transform hover:translate-x-[6px] hover:translate-y-[6px] hover:shadow-none focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-black disabled:cursor-wait disabled:opacity-70 motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0"
      >
        {pending ? t.sending : t.submit}
      </button>
    </form>
  );
}
