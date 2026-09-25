import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Design System | LUMIÈRE",
  description:
    "Design System showcase for LUMIÈRE professional salon supply brand",
};

const NAV_LINKS = [
  { href: "#brand", label: "Brand Identity" },
  { href: "#typography", label: "Typography" },
  { href: "#buttons", label: "Buttons" },
  { href: "#badges", label: "Badges" },
  { href: "#inputs", label: "Inputs" },
  { href: "#cards", label: "Cards & Surfaces" },
  { href: "#spacing", label: "Spacing & Layout" },
  { href: "#shadows", label: "Shadows" },
  { href: "#dividers", label: "Dividers" },
  { href: "#rating", label: "Rating & Price" },
  { href: "#motion", label: "Motion" },
  { href: "#responsive", label: "Responsive" },
];

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-cream">
      {/* Sidebar / Mobile Nav */}
      <aside className="w-full md:w-64 bg-dark text-cream-subtle shrink-0 sticky top-0 z-50 md:h-screen md:overflow-y-auto">
        <div className="p-6">
          <h1 className="font-serif text-2xl text-cream mb-6">LUMIÈRE</h1>
          <span className="eyebrow text-gold-subtle mb-4 block">
            Design System
          </span>
          <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap px-4 py-2 md:px-0 md:py-2 text-sm hover:text-gold transition-colors rounded-full md:rounded-none bg-dark-card md:bg-transparent border border-dark-border md:border-none"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-full overflow-hidden">
        {children}
      </main>
    </div>
  );
}
