const contactUsModel = require('../../models/ContactUs');
const nodemailer = require('nodemailer');

// Nodemailer transporter setup
var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  async function sendMail(subject, htmlContent, toEmail, fromEmail, replyToEmail) {
    const mailOptions = {
      from: fromEmail,
      to: toEmail,
      subject: subject,
      html: htmlContent,
      replyTo: replyToEmail,
    };
  
    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      throw new Error(`Failed to send email: ${err.message}`);
    }
  }
  
  const contactUs = async(req, res)=> {
    const { name, email, message } = req.body;
  
    try {
      const contact = new contactUsModel(req.body);
      await contact.save();
  
      // Email to Admin
      const emailSubjectToAdmin = `Suparcart - New Contact Us Submission`;
      const emailTextToAdmin = `
        <div style="border: 1px solid #ccc; border-radius: 5px; padding: 20px; max-width: 600px; font-family: Arial, sans-serif;">
          <h2 style="color: #333;">New Contact Us Submission</h2>
          <p><strong>Name :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Message :</strong><span style="display: inline-block; margin-left: 10px;"> ${message}</span></p>
        </div>
      `;
      await sendMail(emailSubjectToAdmin, emailTextToAdmin, process.env.EMAIL_USER, email, email);
  
      // Email to Client
      const emailSubjectToClient = `Suparcart - Thank you for contacting us`;
      const emailTextToClient = `
        <div style="border: 1px solid #ccc; border-radius: 5px; padding: 20px; max-width: 600px; font-family: Arial, sans-serif;">
          <h1 style="color: #333;">Hello ${name},</h1>
          <h2>Thank You for Contacting Us!</h2>
          <p>We have received your message and will get back to you soon.</p>
          <p>Here is a copy of your message:</p>
          <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">${message}</blockquote>
          <p>Best regards,<br>Suparcart Team.</p>
        </div>
      `;
      await sendMail(emailSubjectToClient, emailTextToClient, email, process.env.EMAIL_USER, email);
  
      return res.status(200).send('Contact form submitted successfully, and emails have been sent.');
    } catch (err) {
      console.error(err);
      return res.status(500).send(`Error processing your request: ${err.message}`);
    }
  }
  
  module.exports = { contactUs };