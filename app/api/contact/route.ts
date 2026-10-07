import { NextResponse } from "next/server";
import { ownerProjectTemplate, visitorThankYouTemplate } from "@/lib/email-templates";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_PROJECT_TYPES = new Set([
  "Website", "Web App", "Mobile App", "AI Agent", "Voice Agent",
  "Automation", "AI System", "Other",
]);

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) {
    return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (text(body.companyWebsite, 200)) return NextResponse.json({ ok: true });

  const name = text(body.name, 100);
  const email = text(body.email, 254).toLowerCase();
  const projectType = text(body.projectType, 50);
  const brief = text(body.brief, 5000);
  if (name.length < 2 || !EMAIL_PATTERN.test(email) || !ALLOWED_PROJECT_TYPES.has(projectType) || brief.length < 10) {
    return NextResponse.json(
      { error: "Please complete every field with valid project information." },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "SparkV Website <onboarding@resend.dev>";
  if (!apiKey?.startsWith("re_") || !to) {
    console.error("Contact form is missing RESEND_API_KEY or CONTACT_TO_EMAIL.");
    return NextResponse.json(
      { error: "Project intake is temporarily unavailable. Please try again shortly." },
      { status: 503 },
    );
  }

  const project = { name, email, projectType, brief };
  const ownerEmail = ownerProjectTemplate(project);
  const thankYouEmail = visitorThankYouTemplate(project);
  const response = await fetch("https://api.resend.com/emails/batch", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      { from, to: [to], reply_to: email, ...ownerEmail },
      { from, to: [email], reply_to: to, ...thankYouEmail },
    ]),
  });

  if (!response.ok) {
    console.error("Resend rejected contact submission", response.status, await response.text());
    return NextResponse.json(
      { error: "We could not deliver your project brief. Please try again." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
