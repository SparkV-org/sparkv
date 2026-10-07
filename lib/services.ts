/**
 * Service page content. Every claim here is drawn from what the SparkV site already states
 * (services, agent flows, platform capabilities, process, FAQ). No clients, metrics, prices,
 * timelines, locations or credentials are asserted.
 */
export type Service = {
  slug: string;
  name: string;
  serviceType: string;
  /** <title> without the site suffix */
  title: string;
  description: string;
  h1: string;
  /** Direct, self-contained answer shown first */
  answer: string;
  audience: string[];
  problems: string[];
  approach: { title: string; body: string }[];
  included: string[];
  extra?: { id: string; title: string; body: string; points: string[] };
  stack: string;
  deliverables: string[];
  faqs: { q: string; a: string }[];
  related: string[];
};

export const PROCESS = [
  { name: "Discover", body: "Map the business goal, constraints, users, and existing systems before choosing technology." },
  { name: "Design", body: "Turn the problem into a clear product and technical architecture." },
  { name: "Build", body: "Ship small, testable releases so quality stays visible and decisions stay reversible." },
  { name: "Integrate", body: "Connect data, APIs, AI models, and the tools your team already relies on." },
  { name: "Launch", body: "Production readiness includes security, observability, performance, and handoff." },
  { name: "Improve", body: "Learn from real usage, remove friction, and extend what creates value." },
];

const SCOPE_FAQ = {
  q: "How much does a project cost and how long does it take?",
  a: "It depends on scope, integrations, security, and rollout needs, so SparkV does not publish fixed prices or timelines. Describe the problem, the current workflow, and the outcome you want through the project form, and SparkV will respond with a focused technical path forward.",
};
const START_FAQ = {
  q: "How do I start a project with SparkV?",
  a: "Use the “Start a project” form on the homepage. Share what you want to build, automate, or improve, including the current workflow and what success looks like.",
};

export const SERVICES: Service[] = [
  {
    slug: "web-development",
    name: "Web & Mobile Development",
    serviceType: "Web and mobile application development",
    title: "Web & Mobile Development",
    description:
      "SparkV builds websites, web applications, and iOS, Android, and cross-platform apps on a secure, observable foundation designed around how your business operates.",
    h1: "Web and mobile development",
    answer:
      "SparkV designs and builds websites, web applications, and mobile products. Each project starts from the business goal and the systems around it, then moves through design, build, integration, and launch, so the interface, the backend, and the data work as one product.",
    audience: [
      "Founders launching a new product or SaaS platform",
      "Operators replacing spreadsheets, inboxes, and disconnected tools with one system",
      "Teams that need a website, web app, or mobile app backed by a reliable backend",
    ],
    problems: [
      "A product idea that needs a real architecture, not just screens",
      "Manual processes that live across spreadsheets and email threads",
      "A web or mobile experience that is not connected to the systems behind it",
      "An existing system that is hard to change and needs incremental modernization",
    ],
    approach: [
      { title: "Product architecture", body: "Clear boundaries between the interface, services, data, and integrations, so each layer can change without breaking the others." },
      { title: "Authentication and security", body: "Identity, permissions, input validation, and safe server-side boundaries are designed in from the start." },
      { title: "Infrastructure", body: "Environments, deployment, monitoring, and reliable delivery pipelines are part of the build, not an afterthought." },
      { title: "Analytics and operations", body: "Useful product signals, auditability, and tools your team can actually operate after launch." },
    ],
    included: [
      "Websites and web applications",
      "SaaS platforms",
      "APIs and backend systems",
      "iOS, Android, and cross-platform mobile apps",
      "Authentication, roles, and permissions",
      "Deployment, monitoring, and handoff",
    ],
    stack:
      "The right stack depends on the problem. The technologies SparkV lists on its site include React, Next.js, Node.js, Python, PostgreSQL, AWS, and Docker, with AI models such as OpenAI added where AI creates real operational value.",
    deliverables: [
      "Working software running in a production environment",
      "Security, observability, and performance considered before launch",
      "A documented handoff so your team can operate and extend the system",
    ],
    faqs: [
      { q: "Can SparkV improve a system we already have?", a: "Yes. SparkV can assess the current architecture, isolate the highest-value bottleneck, and modernize incrementally instead of forcing a complete rebuild." },
      { q: "Can you integrate with the tools we already use?", a: "Most modern platforms expose APIs or webhooks. SparkV maps the available interfaces, security constraints, and failure modes before recommending an integration approach." },
      { q: "What happens after launch?", a: "Launch is the beginning of real evidence. SparkV monitors system behavior, learns from usage, fixes friction, and extends the product around demonstrated value." },
      SCOPE_FAQ,
      START_FAQ,
    ],
    related: ["custom-software", "ai-automation"],
  },
  {
    slug: "custom-software",
    name: "Custom Software & Business Platforms",
    serviceType: "Custom software development",
    title: "Custom Software & Business Platforms",
    description:
      "SparkV builds custom operations software and multi-tenant, white-label platforms shaped around your exact workflow, from production management to launch and handover.",
    h1: "Custom software and business platforms",
    answer:
      "SparkV builds custom software around the way your company actually operates, rather than forcing your process into a generic tool. That includes cloud production-management systems and multi-tenant, white-label platforms that you can run under your own brand.",
    audience: [
      "Manufacturers and service operators who run on spreadsheets, inboxes, and disconnected departments",
      "Founders turning an industry idea into a business-ready, multi-customer platform",
      "Teams that need internal tools with proper roles, records, and reporting",
    ],
    problems: [
      "Jobs, stages, documents, and decisions scattered across spreadsheets and inboxes",
      "No single live source of truth that is accessible from anywhere",
      "A product idea that needs onboarding, billing, permissions, and admin tooling, not only features",
    ],
    approach: [
      { title: "Study the process first", body: "SparkV studies how your company works, then builds software around that process rather than the other way around." },
      { title: "One live source of truth", body: "Records, files, scheduling, and status live in one cloud system so nothing is lost between departments." },
      { title: "Role-based access", body: "Permissions are modeled per role, so each person sees and changes only what they should." },
      { title: "Start focused, expand deliberately", body: "Each capability can ship independently and later connect into a larger operating system." },
    ],
    included: [
      "Production management: quote, backlog, build, prefab, paint, outsourcing, shipping, VIN assignment, service, and parts",
      "Drag-and-drop scheduling, cloud records, inventory, alerts, and dashboards",
      "Multi-tenant architecture and white-label branding",
      "Client onboarding, roles and permissions, billing and usage",
      "Admin operations and API integrations",
      "Launch and handover so you can onboard your own customers",
    ],
    extra: {
      id: "platforms",
      title: "White-label and multi-tenant platforms",
      body: "If you are launching a service business, marketplace, or industry platform, SparkV can design and build the complete multi-tenant product, then hand it over so you can onboard customers, manage their accounts, and grow the business under your brand.",
      points: [
        "An operator onboards multiple clients and manages teams, bookings, vendors, payments, permissions, and reporting from one product (an example scenario, not a client)",
        "Each customer organization is isolated inside a shared platform",
        "Your branding, your customers, your commercial model",
      ],
    },
    stack:
      "Custom software is usually a combination of a web interface, a backend with a database, authentication, and integrations. SparkV chooses the stack per project and designs the data model and permissions before building screens.",
    deliverables: [
      "Software mapped to your real workflow, in production",
      "Role-based access control and cloud records",
      "A handover so your team can operate, extend, and grow the system",
    ],
    faqs: [
      { q: "What is the difference between custom software and an off-the-shelf tool?", a: "Off-the-shelf tools ask you to adapt your process to them. Custom software is designed around your workflow, data, and rules, which matters most when the process itself is part of your competitive advantage." },
      { q: "Can a platform be white-labeled for our own customers?", a: "Yes. SparkV can build multi-tenant, white-label platforms with branding, client onboarding, roles, billing, and admin tools, then hand them over for you to run." },
      { q: "Can we start small?", a: "Yes. Capabilities can be delivered independently and connected later into a larger platform." },
      SCOPE_FAQ,
      START_FAQ,
    ],
    related: ["web-development", "ai-automation"],
  },
  {
    slug: "ai-agents",
    name: "AI Agents",
    serviceType: "AI agent development",
    title: "AI Agent Development",
    description:
      "SparkV builds AI agents for sales, support, research, and voice that use real tools, follow guardrails, and escalate to people at explicit checkpoints.",
    h1: "AI agents that research, qualify, support, and act",
    answer:
      "An AI agent is software that uses an AI model to reason about a goal, use tools such as your CRM or calendar, and take action. SparkV builds specialized agents for sales, support, research, and voice, each with its own knowledge, tools, guardrails, and escalation rules, and with human oversight where risk requires it.",
    audience: [
      "Teams spending hours qualifying leads and answering repeat questions",
      "Businesses that want an always-on agent on channels like WhatsApp, Instagram DMs, SMS, or voice",
      "Operators who want automation with explicit checkpoints, not a black box",
    ],
    problems: [
      "Leads that go cold because follow-up is slow or inconsistent",
      "Support and scheduling work that repeats every day",
      "Conversations spread across channels with no shared context",
    ],
    approach: [
      { title: "Input, reasoning, action, outcome", body: "Every agent is designed as a clear flow: the input it receives, the reasoning it performs, the action it takes, and the outcome it records. For example, a sales agent captures a lead, researches the account, qualifies it, updates the CRM, and drafts a follow-up." },
      { title: "Controlled autonomy", body: "Agents act within defined tools and guardrails, with explicit checkpoints and human approval where it matters." },
      { title: "Right tool for each decision", body: "Deterministic rules stay deterministic. AI is used where probabilistic reasoning creates value, and humans stay in the loop where risk requires it." },
      { title: "One agent or a team of specialists", body: "Deploy one agent across channels, or use specialized agents with their own knowledge, tools, guardrails, and escalation rules." },
    ],
    included: [
      "Sales, support, and research agents",
      "WhatsApp, Instagram DM, SMS/RCS, and voice-call agents",
      "A unified inbox with routing and human escalation",
      "Connections to your CRM, calendar, and internal tools",
      "Consent-aware channel handling and escalation logic",
    ],
    extra: {
      id: "voice-agents",
      title: "Voice AI agents",
      body: "Voice agents listen naturally, understand intent, use the right tools, and complete real work, from reception and qualification to scheduling and customer support, for both inbound and outbound calls.",
      points: [
        "Listening, reasoning, acting, and completion as clear conversational states",
        "Tool use such as checking a calendar and booking an appointment",
        "A call summary sent after the conversation",
      ],
    },
    stack:
      "Agents combine an AI model, retrieval over your knowledge (RAG), tool integrations, and guardrails. SparkV selects models and tools per use case and keeps the surrounding software, security, and observability production-grade.",
    deliverables: [
      "Agents running on the channels you choose",
      "Defined knowledge, tools, guardrails, and escalation rules",
      "A handoff path to a human whenever the agent should not decide alone",
    ],
    faqs: [
      { q: "What can an AI agent actually do?", a: "Within the tools it is given, an agent can research an account, qualify a lead, update a CRM record, answer a support question, book an appointment, and draft a follow-up. What it can do is defined by the integrations and permissions you approve." },
      { q: "Will an agent act without human review?", a: "Only where you decide it should. SparkV designs explicit checkpoints, and approvals can be required before anything is sent or changed." },
      { q: "How do you decide where AI belongs?", a: "SparkV starts with the decision or task. AI belongs where probabilistic reasoning creates value; deterministic rules remain deterministic; human review stays where risk requires it." },
      { q: "Can one agent work across several channels?", a: "Yes. A single agent can serve multiple channels, or you can use specialized agents that share knowledge, tools, and a unified inbox." },
      START_FAQ,
    ],
    related: ["ai-automation", "custom-software"],
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    serviceType: "AI and business process automation",
    title: "AI & Business Automation",
    description:
      "SparkV designs AI-assisted workflows that connect your existing tools, route work by rules and AI judgment, and keep a human approval step where it matters.",
    h1: "AI and business automation",
    answer:
      "AI automation connects the steps of a business process, such as a new lead arriving, being researched and scored, routed, recorded in the CRM, and followed up, into one flow that runs on its own and pauses for a person where approval is needed. SparkV builds these flows around the tools you already use.",
    audience: [
      "Teams stitching together manual steps across inboxes, spreadsheets, and apps",
      "Marketing and operations teams repeating the same work for every channel",
      "Businesses with documents and knowledge that staff must search by hand",
    ],
    problems: [
      "Fragmented steps that depend on someone remembering to do them",
      "Content rebuilt by hand for every platform",
      "Knowledge locked in documents that nobody can query quickly",
    ],
    approach: [
      { title: "Trigger to outcome", body: "A flow starts with a trigger, applies AI processing, makes a decision, takes an action, waits for human approval where required, and logs a measurable outcome." },
      { title: "Human approval by design", body: "Approval steps are first-class. Nothing is sent or changed without review when you require it." },
      { title: "Connected to your tools", body: "Workflows connect to the CRM, calendar, payments, social channels, and communications providers you already use through their APIs." },
      { title: "AI where it helps", body: "Rules handle what is deterministic. Retrieval, document intelligence, and AI judgment handle what is not." },
    ],
    included: [
      "Workflow automation with triggers, decisions, actions, and approvals",
      "Retrieval-augmented generation (RAG) and knowledge search",
      "Document processing and intelligence",
      "AI copilots connected to the tools you already use",
      "Integrations with CRM, calendar, payments, and messaging",
    ],
    extra: {
      id: "social-publishing",
      title: "Publish once, adapt for every channel",
      body: "Instead of rebuilding the same post for every platform, SparkV can turn one source asset into channel-ready content, approvals, conversations, and measurable follow-through.",
      points: [
        "Platform-specific titles, captions, descriptions, and formats",
        "Approval of previews from the chat you already use, such as WhatsApp or Telegram",
        "Scheduled publishing to every channel you approve",
        "Comment and inbox handling with human escalation",
      ],
    },
    stack:
      "Automation is built on reliable software: queues, integrations, retries, and observability, with AI models and retrieval added at the steps that need judgment. SparkV designs failure handling before it connects the flow to production data.",
    deliverables: [
      "Automated workflows running against your real tools",
      "Approval and escalation steps matched to your risk tolerance",
      "Logs that show what happened and why",
    ],
    faqs: [
      { q: "What is the difference between automation and an AI agent?", a: "Automation follows a defined flow of steps. An agent reasons about a goal and chooses actions. Many systems combine both: a workflow for the predictable parts and an agent for the judgment calls." },
      { q: "Can workflows require human approval?", a: "Yes. Approval steps can be placed anywhere in a flow, so nothing is sent or changed without review when you require it." },
      { q: "Do we have to replace our current tools?", a: "No. SparkV connects to the tools you already use through their APIs or webhooks, after mapping the available interfaces and security constraints." },
      SCOPE_FAQ,
      START_FAQ,
    ],
    related: ["ai-agents", "web-development"],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
