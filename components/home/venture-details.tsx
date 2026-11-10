import { LockKeyhole } from "lucide-react";

// Static venture content. Kept out of the client component so it renders as HTML instead of shipping in the page's JavaScript.
const LIFECYCLE = [
  ["01", "Shape the model", "Define who your customers are, what each one needs to own, and what stays under your control."],
  ["02", "Build the platform core", "Tenant isolation, identity, roles, billing and the first product modules, engineered together."],
  ["03", "Brand and onboard", "Your name, domain and look on the product, with a repeatable path to bring on each new client."],
  ["04", "Launch and hand over", "Production release, documentation and a handover so your team can operate and grow it."],
] as const;

const DELIVERABLES = [
  ["Multi-tenant architecture", "Each customer’s data and settings stay separate inside one product."],
  ["White-label branding", "Your name, logo, colors and domain across the experience."],
  ["Client onboarding", "A guided path to create, configure and activate a new customer account."],
  ["Roles & permissions", "Owners, admins, staff and customers each see only what they should."],
  ["Billing & usage", "Plans, invoices and usage tracking tied to each account."],
  ["Admin operations", "Tools for you to support, suspend, inspect and manage every tenant."],
  ["API integrations", "Connections to the payment, communication and business tools you rely on."],
  ["Launch & handover", "Production deployment, documentation and a clean transfer of ownership."],
] as const;

export function VentureDetails() {
  return (
    <>
        <div className="sx-life">{LIFECYCLE.map(([n, t, d]) => <div key={n}><span>{n}</span><strong>{t}</strong><p>{d}</p></div>)}</div>

        <p className="sx-sub">WHAT YOU RECEIVE</p>
        <div className="sx-deliver">{DELIVERABLES.map(([t, d]) => <article key={t}><LockKeyhole size={16} /><strong>{t}</strong><p>{d}</p></article>)}</div>
    </>
  );
}
