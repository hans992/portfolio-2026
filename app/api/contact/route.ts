import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const contactSchema = {
  name: "string",
  email: "string",
  projectType: "string",
  message: "string",
} as const;

function validateBody(body: unknown): body is Record<keyof typeof contactSchema, string> {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.length >= 2 &&
    typeof b.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.projectType === "string" &&
    ["ai_chatbot", "rag_system", "fullstack_webapp", "other"].includes(b.projectType) &&
    typeof b.message === "string" &&
    b.message.length >= 20
  );
}

const PROJECT_TYPE_LABELS: Record<string, string> = {
  ai_chatbot: "AI Chatbot",
  rag_system: "RAG System",
  fullstack_webapp: "Full-Stack Web App",
  other: "Other",
};

export async function POST(request: Request) {
  try {
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_APP_PASSWORD;

    if (!emailUser || !emailPassword) {
      console.error("[contact] Missing EMAIL_USER or EMAIL_APP_PASSWORD");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 503 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    if (!validateBody(body)) {
      return NextResponse.json(
        { error: "Invalid or missing fields. Check name, email, project type, and message length." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    const projectLabel = PROJECT_TYPE_LABELS[body.projectType] ?? body.projectType;
    const html = `
      <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto;">
        <h2 style="color: #1a1a1a;">New contact form submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Name</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(body.name)}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(body.email)}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Project type</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${escapeHtml(projectLabel)}</td></tr>
        </table>
        <h3 style="color: #1a1a1a; margin-top: 24px;">Message</h3>
        <p style="white-space: pre-wrap; color: #333;">${escapeHtml(body.message)}</p>
      </div>
    `;

    await transporter.sendMail({
      from: emailUser,
      to: emailUser,
      replyTo: body.email,
      subject: `Portfolio contact: ${body.name} – ${projectLabel}`,
      text: `Name: ${body.name}\nEmail: ${body.email}\nProject type: ${projectLabel}\n\nMessage:\n${body.message}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Send failed:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
