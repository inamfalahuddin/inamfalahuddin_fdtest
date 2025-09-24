import nodemailer from "nodemailer";
import { tr } from "zod/locales";

const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    tls: {
        ciphers: "SSLv3",
    },
    auth: {
        user: "inam@simgenerus.com",
        pass: "Sutajaya@1234",
    },
});

transporter.sendMail({
    from: "inam@simgenerus.com",
    to: "inamfalahuddin06@gmail.com",
    subject: "Test SMTP",
    text: "Hello world",
})
    .then(() => console.log("Email sent"))
    .catch(err => console.error(err));
