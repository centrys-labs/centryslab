import { footer } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <p>{footer.line}</p>
      </div>
    </footer>
  );
}
