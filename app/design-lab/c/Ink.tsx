import s from "./c.module.css";

type Props = {
  text: string;
  as?: "h2" | "h3" | "p";
  id?: string;
  className?: string;
};

// Titular estático a dos tintas: el texto real en azul y una capa rosa decorativa desplazada.
export function Ink({ text, as: Tag = "h2", id, className = "" }: Props) {
  return (
    <Tag id={id} className={`${s.serif} ${s.ink} ${className}`}>
      {text}
      <span aria-hidden="true" className={s.inkLayer}>
        {text}
      </span>
    </Tag>
  );
}
