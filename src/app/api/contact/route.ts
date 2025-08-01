import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, businessType, message } = body;

    // Validation with Serbian messages
    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "Ime i prezime su obavezni" },
        { status: 400 }
      );
    }

    if (!email || email.trim() === "") {
      return NextResponse.json(
        { error: "Email adresa je obavezna" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Molimo unesite valjan email" },
        { status: 400 }
      );
    }

    if (!message || message.trim() === "") {
      return NextResponse.json(
        { error: "Poruka je obavezna" },
        { status: 400 }
      );
    }

    // Check if Resend API key and recipient email are configured
    if (!process.env.RESEND_API_KEY) {
      console.error("Resend API key not configured");
      return NextResponse.json(
        {
          error:
            "Email servis trenutno nije dostupan. Molimo kontaktirajte nas direktno.",
        },
        { status: 500 }
      );
    }

    if (!process.env.CONTACT_EMAIL) {
      console.error("Contact email not configured");
      return NextResponse.json(
        {
          error:
            "Email servis trenutno nije dostupan. Molimo kontaktirajte nas direktno.",
        },
        { status: 500 }
      );
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: "LD Biro Kontakt <kontakt@resend.dev>",
      to: [process.env.CONTACT_EMAIL],
      replyTo: email, // Allow direct reply to the person who sent the message
      subject: `🔔 NOVA PORUKA: ${name} - ${businessType || "Klijent"}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nova poruka - LD Biro</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 24px;">📧 Nova poruka sa sajta</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">LD Biro - Kontakt forma</p>
          </div>
          
          <div style="background: #f8fafc; padding: 25px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <h2 style="color: #1e40af; margin-top: 0;">Detalji kontakta</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 30%;">👤 Ime:</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">📧 Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">🏢 Tip biznisa:</td>
                <td style="padding: 8px 0;">${businessType || "Nije specificiran"}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: white; padding: 25px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 20px;">
            <h3 style="color: #1e40af; margin-top: 0;">💬 Poruka:</h3>
            <div style="background: #f9fafb; padding: 15px; border-radius: 6px; border-left: 3px solid #3b82f6;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background: #f1f5f9; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #64748b; font-size: 14px;">
              <strong>⚡ Brz odgovor:</strong> Možete direktno odgovoriti na ovaj email
            </p>
            <p style="margin: 5px 0 0 0; color: #64748b; font-size: 12px;">
              Vreme slanja: ${new Date().toLocaleString("sr-RS", { timeZone: "Europe/Belgrade" })}
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
NOVA PORUKA SA LD BIRO SAJTA

Ime: ${name}
Email: ${email}
Tip biznisa: ${businessType || "Nije specificiran"}

Poruka:
${message}

---
Vreme slanja: ${new Date().toLocaleString("sr-RS", { timeZone: "Europe/Belgrade" })}
Možete direktno odgovoriti na ovaj email.
      `,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
        "X-Mailer": "LD Biro Contact Form",
        "X-Auto-Response-Suppress": "OOF, DR, RN, NRN, AutoReply",
      },
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        {
          error: "Greška pri slanju poruke. Molimo pokušajte ponovo.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Poruka je uspešno poslana!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    // Log the error for debugging
    console.error("Unexpected error:", error);

    return NextResponse.json(
      {
        error:
          "Greška pri slanju poruke. Molimo pokušajte ponovo ili nas kontaktirajte direktno.",
      },
      { status: 500 }
    );
  }
}
