type ProjectBrief = {
  name: string;
  email: string;
  projectType: string;
  brief: string;
};

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
})[character] ?? character);

const shell = (content: string) => `<!doctype html><html><body style="margin:0;background:#f5f5f2;color:#111;font-family:Arial,sans-serif"><div style="max-width:640px;margin:0 auto;padding:40px 20px"><div style="padding:30px;border:1px solid #deded8;background:#fff"><div style="margin-bottom:26px;color:#ef1822;font-size:12px;font-weight:700;letter-spacing:.16em">SPARKV</div>${content}</div><p style="margin:18px 0 0;color:#777;font-size:12px">Software · AI · Automation</p></div></body></html>`;

export function ownerProjectTemplate(project: ProjectBrief) {
  const safe = Object.fromEntries(Object.entries(project).map(([key, value]) => [key, escapeHtml(value)])) as ProjectBrief;
  return {
    subject: `New SparkV project brief: ${project.projectType}`.replace(/[\r\n]+/g, " "),
    text: [`Name: ${project.name}`, `Email: ${project.email}`, `Project type: ${project.projectType}`, "", project.brief].join("\n"),
    html: shell(`<h1 style="margin:0 0 22px;font-size:30px">New project brief</h1><table style="width:100%;border-collapse:collapse;font-size:14px"><tr><td style="padding:9px 0;color:#777">Name</td><td style="padding:9px 0;text-align:right;font-weight:700">${safe.name}</td></tr><tr><td style="padding:9px 0;color:#777">Email</td><td style="padding:9px 0;text-align:right">${safe.email}</td></tr><tr><td style="padding:9px 0;color:#777">Project</td><td style="padding:9px 0;text-align:right">${safe.projectType}</td></tr></table><div style="margin-top:24px;padding:20px;background:#f6f6f3;white-space:pre-wrap;line-height:1.6">${safe.brief}</div>`),
  };
}

export function visitorThankYouTemplate(project: ProjectBrief) {
  const name = escapeHtml(project.name.split(/\s+/)[0] || project.name);
  const projectType = escapeHtml(project.projectType);
  return {
    subject: "Thanks for contacting SparkV",
    text: `Hi ${project.name},\n\nThanks for sharing your ${project.projectType} project with SparkV. We received your brief and will review it carefully before following up.\n\n— SparkV`,
    html: shell(`<h1 style="margin:0 0 18px;font-size:34px">Thanks, ${name}.</h1><p style="margin:0;color:#555;font-size:16px;line-height:1.7">We received your <strong>${projectType}</strong> project brief. Our team will review the workflow, requirements, and desired outcome before following up.</p><div style="margin-top:28px;padding:18px;border-left:3px solid #ef1822;background:#f6f6f3;color:#555;font-size:14px;line-height:1.6">Your brief is now in the SparkV project-intake queue.</div>`),
  };
}
