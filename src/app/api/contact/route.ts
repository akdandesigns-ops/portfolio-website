import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, type, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Configure Nodemailer transporter
    // User needs to set these in .env.local
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // We proceed to process emails even if env vars are missing to simulate success in dev if not set
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("⚠️ SMTP Credentials missing! Email simulation successful, but no real email sent.");
      console.warn("Payload:", { name, email, company, type, message });
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({ success: true, message: "Simulated email sent successfully" }, { status: 200 });
    }

    // 1. Email to Brand Owner (You)
    const ownerMailOptions = {
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
      subject: `New Call Booking Request: ${name} (${company || 'No Company'})`,
      text: `
You have a new booking request from your site.

Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Service Requested: ${type || 'Not specified'}

Message:
${message}
      `,
    };

    // 2. Auto-reply to the Client
    const clientMailOptions = {
      from: `"akdandesigns" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: email,
      subject: "Your clarity session is requested.",
      text: `Hello ${name},

Thank you for requesting a call with akdandesigns.

This email confirms that I have received your request regarding:
"${message.substring(0, 100)}${message.length > 100 ? '...' : ''}"

I will personally review your details and reach out within 24 hours to coordinate our session.

Best regards,
Akdan
akdandesigns`,
    };

    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(clientMailOptions);

    return NextResponse.json({ success: true, message: "Emails sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
