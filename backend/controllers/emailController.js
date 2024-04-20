// path/to/sendEmail.js
require("dotenv").config()
const nodemailer = require("nodemailer");
const EmailModel = require("../DB/Models/emailModel");
const SenderEmail = process.env.SENDER_EMAIL;
const SenderEmailPass = process.env.SENDER_PASS;
const ReceiverEmails = process.env.RECIEVER_LIST;
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: SenderEmail,
        pass: SenderEmailPass,
    },
});

const SendEmail = async (emailDetails) => { // Accept emailDetails as parameter

    try {
        const newEmail = new EmailModel({
            senderEmail: SenderEmail,
            receiverEmail: ReceiverEmails,
            subjectEmail: emailDetails.subject,
            bodyEmail: emailDetails.text,
        });
        const savedEmail = await newEmail.save();
        console.log('Email saved to the database:', savedEmail);

        const info = await transporter.sendMail({
            from: SenderEmail,
            to: ReceiverEmails,
            subject: emailDetails.subject,
            text: emailDetails.text,
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
// controllers/emailController.js

// Define your controller function
const sendEmailController = async (req, res) => {
    try {
        await SendEmail(req.body); // Pass the req.body to the SendEmail function
        res.status(200).send("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending email");
    }
};

module.exports = sendEmailController;