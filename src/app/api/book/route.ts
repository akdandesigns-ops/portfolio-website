import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123");
const meetLink = process.env.NEXT_PUBLIC_GOOGLE_MEET_LINK || "https://meet.google.com/your-meet-link";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, type, message, slot } = body;

    // 1. Store in Google Sheets (Excel)
    try {
      const formPayload = new URLSearchParams();
      formPayload.append("name", name);
      formPayload.append("email", email);
      formPayload.append("company", company || "");
      formPayload.append("type", type);
      formPayload.append("message", `[Slot: ${slot}]\n\n${message}`);
      formPayload.append("timestamp", new Date().toISOString());

      // We do not await this heavily or fail if it fails, just fire-and-forget or await gracefully.
      await fetch(
        "https://script.google.com/macros/s/AKfycby_25qDxXRa-65sNBLfd6_-T7iEAgnm4QvjiSpCSOWNjzC4j4MA_e7OPvE2HSitGR21/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formPayload.toString(),
        }
      );
    } catch (sheetError) {
      console.error("Google Sheets Error:", sheetError);
      // We continue even if sheets fail, to ensure emails still go out.
    }

    // 2. Send email to AK DAN DESIGNS
    const ownerEmail = await resend.emails.send({
      from: "Booking <design@akdandesigns.in>", // This domain must be verified in Resend.
      to: ["design@akdandesigns.in"],
      subject: `New Call Booking: ${name} from ${company || "Unknown"}`,
      html: `
        <h2>New Call Booking Scheduled</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Project Type:</strong> ${type}</p>
        <p><strong>Description:</strong> ${message}</p>
        <br/>
        <h3><strong>Scheduled Time:</strong> ${slot}</h3>
        <p><strong>Meeting Link:</strong> <a href="${meetLink}">${meetLink}</a></p>
      `,
    });

    if (ownerEmail.error) {
      console.error("Resend Owner Email Error:", ownerEmail.error);
      throw new Error(ownerEmail.error.message);
    }

    // Send confirmation email to the User
    const clientEmail = await resend.emails.send({
      from: "AK DAN DESIGNS <design@akdandesigns.in>",
      to: [email],
      subject: `Booking Confirmed: Brand Strategy Call with AK DAN DESIGNS`,
      html: `
        <div style="font-family: sans-serif; color: #111; max-width: 600px; margin: 0 auto; line-height: 1.6;">
          <h2 style="color: #FF8709;">Call Scheduled Successfully</h2>
          <p>Hi ${name},</p>
          <p>Thank you for reaching out. Your brand strategy session has been successfully booked.</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Time:</strong> ${slot}</p>
            <p style="margin: 10px 0 0 0;"><strong>Google Meet Link:</strong> <a href="${meetLink}">${meetLink}</a></p>
          </div>
          <p>I look forward to discussing your project (${type}).</p>
          <br/>
          <p>Best regards,<br/>Aswin Kumaaran<br/>AK DAN DESIGNS</p>
        </div>
      `,
    });

    if (clientEmail.error) {
      console.error("Resend Client Email Error:", clientEmail.error);
      // We log it but maybe don't fail the whole request if the owner email succeeded?
      // Actually, if the domain is unverified, both fail. Let's throw.
      throw new Error(clientEmail.error.message);
    }

    return NextResponse.json({ success: true, message: "Emails sent successfully." });
  } catch (error: any) {
    console.error("Booking Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to book call. Please try again." },
      { status: 500 }
    );
  }
}
