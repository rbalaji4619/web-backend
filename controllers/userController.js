const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

// Create new contact + send mail
exports.createContact = async (req, res) => {
  try {
    const { name, email, phoneNumber, companyname, description } = req.body;

    if (!name || !email || !phoneNumber || !companyname) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    // 1️⃣ Save contact in DB
    const contact = await Contact.create({
      name,
      email,
      phoneNumber,
      companyname,
      description,
    });

    // 2️⃣ Configure SMTP transporter (Gmail example)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for port 465, false for 587
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // app password (not Gmail login password)
      },
    });

    // 3️⃣ Send mail with contact details
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: "burjtechconsultancy@gmail.com",
      subject: `📩 New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Company:</strong> ${companyname}</p>
        <p><strong>Description:</strong> ${description || "N/A"}</p>
      `,
    });

    res.status(200).json({ message: "✅ Contact saved & email sent", contact });
  } catch (error) {
    console.error("❌ Error saving contact or sending email:", error);
    res.status(500).json({ error: "Failed to save contact or send email" });
  }
};
