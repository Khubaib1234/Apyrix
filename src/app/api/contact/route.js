import fs from "fs";
import path from "path";
import { Resend } from "resend";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, project } = body;

    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "contacts.json");

    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

    let contacts = [];
    if (fs.existsSync(filePath)) {
      contacts = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    contacts.push({ name, email, phone, project, date: new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));

    const date = new Date().toISOString()
    const resend = new Resend(process.env.RESEND_API_KEY);
    const subject = `New Contact Form Submission`;
    const html = `
      <h3>New contact received:</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Project:</strong> ${project}</p>
      <p><strong>Date:</strong> ${date}</p>
    `;
    await resend.emails.send({
      from: process.env.SENDER_EMAIL,
      to: [process.env.ADMIN_EMAIL],
      subject,
      html,
    })

    return new Response(JSON.stringify({ message: "Contact saved!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
