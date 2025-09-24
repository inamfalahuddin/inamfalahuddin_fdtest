import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: true,
    tls: {
        ciphers: "SSLv3",
    },
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    await transporter.sendMail({
        from: `"No Reply" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html,
    });
};
