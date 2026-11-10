"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Bot, Brain, Check, Gauge, Inbox, MessageSquareText, PhoneCall, Send, ShieldCheck, Smartphone, UserCheck, Wrench } from "lucide-react";
import { SectionIntro } from "./section-intro";

/* ───────────────────────── Creative approval loop ───────────────────────── */

type Msg = { from: "bot" | "you"; text: string; tiles?: string[]; chips?: string[] };
const LOOP: { n: string; title: string; sum: string; sparkv: string; you: string; chat: Msg[] }[] = [
  { n: "01", title: "Generate", sum: "Create thumbnail options and channel assets from the approved brand system.", sparkv: "Drafts several options per channel using your approved fonts, colors, tone and source asset.", you: "You define the brand rules once. Nothing leaves the workspace unreviewed.", chat: [{ from: "bot", text: "3 thumbnail options are ready for “Spring launch reel”.", tiles: ["A", "B", "C"] }] },
  { n: "02", title: "Review", sum: "Send previews to WhatsApp or Telegram for approval.", sparkv: "Delivers previews with per-channel titles and captions to the chat you already use.", you: "Reviewers see exactly what would be published, on the channel it would be published to.", chat: [{ from: "bot", text: "Preview sent for approval: Instagram, YouTube, LinkedIn.", chips: ["Instagram", "YouTube", "LinkedIn"] }, { from: "you", text: "Looks close. Opening B." }] },
  { n: "03", title: "Refine", sum: "Reply by text or voice: “make the headline bolder and use the second image.”", sparkv: "Interprets the instruction, regenerates only what changed, and returns a new preview.", you: "Ask in plain language, text or a voice note. Every revision keeps its history.", chat: [{ from: "you", text: "🎙 “Make the headline bolder and use the second image.”" }, { from: "bot", text: "Done. Headline weight increased, image 2 applied. New preview below.", tiles: ["B2"] }] },
  { n: "04", title: "Approve", sum: "Choose the final asset with one tap, then schedule or publish everywhere.", sparkv: "Queues the approved version for each channel at the times you choose.", you: "One tap approves. Nothing is published without an explicit approval.", chat: [{ from: "you", text: "Approve B2." }, { from: "bot", text: "Approved. Scheduled to every channel you selected.", chips: ["Instagram", "YouTube", "LinkedIn"] }] },
  { n: "05", title: "Expand", sum: "Next phase: generate complete niche-specific videos for review before publishing.", sparkv: "Planned next phase: full video generation for a niche, delivered into the same approval loop.", you: "Same control model: you review before anything goes live.", chat: [{ from: "bot", text: "Next phase · Niche video drafts will arrive here for review, just like these assets." }] },
];

export function ApprovalLoop() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);
  useEffect(() => { reduced.current = matchMedia("(prefers-reduced-motion: reduce)").matches; }, []);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => { if (!reduced.current) setI((v) => (v + 1) % LOOP.length); }, 6000);
    return () => clearInterval(t);
  }, [paused]);
  const s = LOOP[i];
  return (
    <section className="section creator-loop sx-loop" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <SectionIntro label="CREATIVE APPROVAL LOOP" title="Create, review, refine, and publish—from the chat you already use." body="A staged workflow keeps humans in control while removing repetitive production work." />
      <div className="sx-loop-grid">
        <div className="sx-steps" role="tablist" aria-label="Approval loop stages">
          {LOOP.map((x, k) => (
            <button key={x.n} role="tab" aria-selected={k === i} className={`sx-step ${k === i ? "is-active" : ""} ${k < i ? "is-done" : ""}`} onClick={() => setI(k)}>
              <span className="sx-step-n">{k < i ? <Check size={14} /> : x.n}</span>
              <span className="sx-step-body"><strong>{x.title}</strong><small>{x.sum}</small></span>
              {k === i && !paused && <i className="sx-step-timer" key={`t${i}`} />}
            </button>
          ))}
        </div>
        <div className="sx-loop-detail" key={s.n}>
          <div className="sx-phone" aria-live="polite">
            <div className="sx-phone-bar"><span className="sx-avatar">V</span><div><strong>SparkV · Approvals</strong><small>online</small></div></div>
            <div className="sx-chat">
              {s.chat.map((m, k) => (
                <div key={k} className={`sx-msg ${m.from}`} style={{ animationDelay: `${k * 0.55}s` }}>
                  <p>{m.text}</p>
                  {m.tiles && <div className="sx-tiles">{m.tiles.map((t) => <span key={t}>{t}</span>)}</div>}
                  {m.chips && <div className="sx-chips">{m.chips.map((c) => <em key={c}>{c}</em>)}</div>}
                </div>
              ))}
              {i === 3 && <div className="sx-msg bot" style={{ animationDelay: "1.1s" }}><p className="sx-ok"><Check size={14} /> Scheduled · you can still cancel any time before it goes out.</p></div>}
            </div>
          </div>
          <div className="sx-explain">
            <p className="sx-kicker">STAGE {s.n} / 05</p>
            <h3>{s.title}</h3>
            <div className="sx-split"><div><b><Bot size={15} /> SparkV does</b><p>{s.sparkv}</p></div><div><b><UserCheck size={15} /> You control</b><p>{s.you}</p></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Conversational agents ───────────────────────── */

const CHANNELS = [
  { k: "WhatsApp", I: MessageSquareText, tag: "Qualification · support", handles: ["Answers common questions from your approved knowledge", "Qualifies new enquiries and collects the details your team needs", "Books or reschedules appointments"], tools: ["Knowledge retrieval", "Calendar", "CRM record update"], guard: "Respects WhatsApp messaging windows and approved templates; sends only what you have allowed.", esc: "Hands the chat to a person on request, on low confidence, or on sensitive topics." },
  { k: "Instagram DM", I: Send, tag: "Engage · convert", handles: ["Replies to product and pricing questions in your brand voice", "Turns comments and story replies into conversations", "Routes interested people to booking or checkout"], tools: ["Knowledge retrieval", "Link and booking tools", "Lead capture"], guard: "Stays inside the platform’s messaging rules and your tone and topic limits.", esc: "Escalates complaints, refunds and anything outside its allowed scope." },
  { k: "Voice calls", I: PhoneCall, tag: "Answer · book", handles: ["Answers inbound calls and understands the caller’s intent", "Qualifies, schedules and takes messages", "Sends a written summary after every call"], tools: ["Speech in / out", "Calendar", "Ticket or CRM write-back"], guard: "Follows a defined script and tool allow-list; never invents policies or prices.", esc: "Transfers to a person on request or when the caller needs one." },
  { k: "SMS / RCS", I: Smartphone, tag: "Notify · follow up", handles: ["Sends reminders, confirmations and follow-ups", "Handles short replies and opt-outs", "Moves a thread to chat or voice when it needs more"], tools: ["Message templates", "Contact segments", "Delivery status"], guard: "Consent-aware: honors opt-outs and only messages people who agreed to be contacted.", esc: "Flags replies the agent can’t resolve for a person to pick up." },
  { k: "Unified inbox", I: Inbox, tag: "Route · resolve", handles: ["Brings every channel into one conversation history", "Classifies and routes each thread to the right agent or person", "Keeps context when a customer switches channel"], tools: ["Routing rules", "Assignment", "Exportable history"], guard: "Role-based access decides who can see and act on each conversation.", esc: "Anything unresolved lands with a named owner, not in a void." },
];
const BRAIN = [[Brain, "Knowledge"], [Wrench, "Tools"], [ShieldCheck, "Guardrails"], [UserCheck, "Human escalation"], [Gauge, "Analytics"]] as const;

export function ChannelAgents() {
  const [i, setI] = useState(0);
  const c = CHANNELS[i];
  const Icon = c.I;
  return (
    <section className="section channel-agents sx-agents">
      <div className="sx-agents-head">
        <SectionIntro label="CONVERSATIONAL AGENTS" title="Always-on agents for every important channel." body="Deploy one agent across channels or use specialized agents with their own knowledge, tools, guardrails, and escalation rules." />
        <a href="#contact" className="button button-primary">Design Your Agent System <ArrowUpRight /></a>
      </div>
      <div className="sx-agents-grid">
        <div className="sx-channels" role="tablist" aria-label="Channels">
          {CHANNELS.map((x, k) => { const I = x.I; return (
            <button key={x.k} role="tab" aria-selected={k === i} className={`sx-channel ${k === i ? "is-active" : ""}`} onClick={() => setI(k)}>
              <I size={20} /><span><strong>{x.k}</strong><small>{x.tag}</small></span>
            </button>
          ); })}
        </div>
        <div className="sx-agent-panel" key={c.k} role="tabpanel">
          <div className="sx-agent-top">
            <div className="sx-core"><i /><i /><i /><Icon size={26} /></div>
            <div><p className="sx-kicker">SPARKV AGENT LAYER · {c.k.toUpperCase()}</p><h3>{c.tag}</h3></div>
          </div>
          <div className="sx-agent-cols">
            <div><b>What it handles</b><ul>{c.handles.map((h) => <li key={h}><Check size={14} />{h}</li>)}</ul></div>
            <div>
              <b>Tools it can use</b><div className="sx-chips">{c.tools.map((t) => <em key={t}>{t}</em>)}</div>
              <b>Guardrails</b><p>{c.guard}</p>
              <b>Hands off to a person when</b><p>{c.esc}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="sx-brain" aria-label="Shared agent foundations">
        <span className="sx-brain-label">EVERY AGENT SHARES</span>
        {BRAIN.map(([I, t]) => <span key={t}><I size={16} />{t}</span>)}
      </div>
    </section>
  );
}

/* ───────────────────────── Venture / white-label ───────────────────────── */

const EXAMPLES = [
  { k: "Event operations", title: "Event operations platform", text: "A branded system for an operator to onboard multiple event clients, manage teams, bookings, vendors, payments, permissions, and reporting from one product.", tenants: ["Client A", "Client B", "Client C"], mods: ["Bookings", "Vendors", "Staff rosters", "Payments"] },
  { k: "Service marketplace", title: "Service marketplace", text: "A marketplace where providers onboard themselves, list services, take bookings and get paid, while you control the rules, fees and brand.", tenants: ["Provider A", "Provider B", "Provider C"], mods: ["Listings", "Bookings", "Payouts", "Reviews"] },
  { k: "Field-service network", title: "Field-service network", text: "One product for a network of local operators, each with their own crew, jobs, customers and invoices under your brand.", tenants: ["Branch A", "Branch B", "Branch C"], mods: ["Scheduling", "Job records", "Mobile app", "Invoicing"] },
  { k: "Training academy", title: "Training academy", text: "A white-label learning platform where each organization manages its own learners, courses, progress and certificates.", tenants: ["Org A", "Org B", "Org C"], mods: ["Courses", "Learners", "Progress", "Certificates"] },
] as const;

export function VentureExplorer({ children }: { children?: React.ReactNode }) {
  const [i, setI] = useState(0);
  const e = EXAMPLES[i];
  return (
    <section className="section venture-section sx-venture">
      <div className="venture-card sx-venture-card">
        <p className="section-label"><span />PRODUCT VENTURES &amp; WHITE-LABEL PLATFORMS</p>
        <h2>Bring the idea. We’ll build the business-ready platform behind it.</h2>
        <p className="sx-lede">Launching a service business, marketplace, or industry platform? SparkV can design and build the complete multi-tenant product, then hand it over so you can onboard your own customers, manage their accounts, and grow the business under your brand.</p>

        <div className="sx-ex-tabs" role="tablist" aria-label="Illustrative platform examples">
          {EXAMPLES.map((x, k) => <button key={x.k} role="tab" aria-selected={k === i} className={k === i ? "is-active" : ""} onClick={() => setI(k)}>{x.k}</button>)}
        </div>
        <div className="sx-ex" key={e.k}>
          <div className="sx-ex-copy"><small>ILLUSTRATIVE EXAMPLE</small><strong>{e.title}</strong><span>{e.text}</span><div className="sx-chips">{e.mods.map((m) => <em key={m}>{m}</em>)}</div></div>
          <div className="sx-tenants" aria-hidden="true">
            <b className="sx-root">YOUR PLATFORM</b>
            <div className="sx-tenant-lines"><i /><i /><i /></div>
            <div className="sx-tenant-row">{e.tenants.map((t) => <span key={t}>{t}</span>)}</div>
            <small>Separate data, branding and permissions per tenant</small>
          </div>
        </div>

        {children}
        <a href="#contact" className="button button-primary">Turn Your Idea Into a Platform <ArrowUpRight /></a>
      </div>
    </section>
  );
}
