import { contact } from "@/lib/content";

export default function ContactLine() {
  return (
    <p className="copy">
      {contact.parts.map((part, index) =>
        part.href ? (
          <a key={index} href={part.href} rel="noreferrer">
            {part.text}
          </a>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </p>
  );
}
