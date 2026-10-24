"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { sendContact, type ContactState } from "../../actions/contact";
import { contactForm as t } from "../content";
import { focus } from "./ui";

const INTEREST_EVENT = "statex:interest";
const initial: ContactState = { status: "idle" };

const label = "block text-[14px] text-(--h-titanium)";
// Campos de una sola línea inferior: como un formulario impreso, sin cajas.
const input =
  "mt-2 block w-full min-h-12 border-0 border-b border-(--h-ivory)/35 bg-transparent px-0 py-2 text-[17px] text-(--h-ivory) transition-colors hover:border-(--h-ivory)/70 outline-none focus:border-(--h-ivory) focus:shadow-[0_1px_0_0_#F2F0EA] aria-[invalid=true]:border-(--h-red-text) motion-reduce:transition-none";
const errorText = "mt-2 text-[14px] text-(--h-red-text)";

/** Enlace de oferta: preselecciona el interés en el formulario y lleva a #contacto. */
export function OfferLink({ interest, children, className = "" }: { interest: string; children: ReactNode; className?: string }) {
  return (
    <a
      href="#contacto"
      onClick={() => window.dispatchEvent(new CustomEvent(INTEREST_EVENT, { detail: interest }))}
      className={`inline-flex min-h-12 items-center font-medium transition-colors motion-reduce:transition-none ${focus} ${className}`}
    >
      {children}
    </a>
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
    if (state.values?.interest) setInterest(state.values.interest);
  }, [state]);

  if (state.status === "ok") {
    return (
      <div className="border-t border-(--h-red) pt-8">
        <p ref={status} tabIndex={-1} role="status" className="m-0 text-[clamp(1.4rem,2.4vw,2rem)] font-semibold leading-tight outline-none">
          {t.success}
        </p>
      </div>
    );
  }

  const err = (k: keyof typeof fe) => (fe[k] ? <p id={`hf-${k}-err`} className={errorText}>{fe[k]}</p> : null);
  const aria = (k: keyof typeof fe) => ({ "aria-invalid": fe[k] ? true : undefined, "aria-describedby": fe[k] ? `hf-${k}-err` : undefined });

  return (
    <form action={action} noValidate className="relative">
      <h3 className="m-0 text-[1.35rem] font-semibold uppercase tracking-[-0.01em]">{t.title}</h3>

      {(state.status === "error" || state.status === "not-configured") && (
        <p
          ref={status}
          tabIndex={-1}
          role="alert"
          className={`m-0 mt-6 border-l-2 py-1 pl-4 outline-none ${state.status === "error" ? "border-(--h-red-text) text-(--h-red-text)" : "border-(--h-titanium) text-(--h-titanium)"}`}
        >
          {state.status === "error" ? t.error : t.notConfigured}
        </p>
      )}

      <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <div>
          <label htmlFor="hf-name" className={label}>{t.fields.name}</label>
          <input id="hf-name" name="name" defaultValue={v?.name} autoComplete="name" required maxLength={120} className={input} {...aria("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="hf-company" className={label}>{t.fields.company}</label>
          <input id="hf-company" name="company" defaultValue={v?.company} autoComplete="organization" required maxLength={160} className={input} {...aria("company")} />
          {err("company")}
        </div>
        <div>
          <label htmlFor="hf-email" className={label}>{t.fields.email}</label>
          <input id="hf-email" name="email" defaultValue={v?.email} type="email" autoComplete="email" required maxLength={200} className={input} {...aria("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="hf-role" className={label}>{t.fields.role}</label>
          <input id="hf-role" name="role" defaultValue={v?.role} autoComplete="organization-title" maxLength={120} className={input} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="hf-interest" className={label}>{t.fields.interest}</label>
          {/* No controlado: key fuerza el remontaje cuando una oferta cambia el interés. */}
          <select key={interest} id="hf-interest" name="interest" defaultValue={interest} className={`${input} cursor-pointer`} {...aria("interest")}>
            {t.interestOptions.map((o) => (
              <option key={o.value} value={o.value} className="bg-(--h-ink)">{o.label}</option>
            ))}
          </select>
          {err("interest")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="hf-message" className={label}>{t.fields.message}</label>
          <textarea id="hf-message" name="message" defaultValue={v?.message} required rows={4} maxLength={4000} className={`${input} resize-y`} {...aria("message")} />
          {err("message")}
        </div>
      </div>

      {/* Campo trampa para bots: invisible para personas y lectores de pantalla */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="hf-website">No rellenar</label>
        <input id="hf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-8">
        <label className="flex items-start gap-3 text-[15px] text-(--h-ivory)/85">
          <input name="consent" type="checkbox" className={`mt-0.5 size-5 shrink-0 cursor-pointer accent-(--h-red) ${focus}`} {...aria("consent")} />
          <span>{t.consent}</span>
        </label>
        {err("consent")}
        <p className="m-0 mt-3 text-[13px] text-(--h-titanium)">
          {t.privacyNote.before}
          <Link href={t.privacyNote.href} className={`underline underline-offset-4 hover:text-(--h-ivory) ${focus}`}>{t.privacyNote.link}</Link>.
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className={`mt-10 inline-flex min-h-13 cursor-pointer items-center bg-(--h-ivory) px-8 font-medium text-(--h-ink) transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-70 motion-reduce:transition-none ${focus}`}
      >
        {pending ? t.sending : t.submit}
      </button>
    </form>
  );
}
