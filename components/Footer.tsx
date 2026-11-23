import Link from "next/link";
import { consent, footer } from "@/lib/content";
import CookieSettings from "./CookieSettings";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <p>
          {footer.line} <Link href="/privacy">{consent.privacy}</Link>{" "}
          <CookieSettings />
        </p>
      </div>
    </footer>
  );
}
