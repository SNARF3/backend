import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, text }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'birbumaxi@gmail.com', // Tu correo electrónico
            pass: 'caswdqajkwiyfriz'    // Contraseña o contraseña de aplicación
        }
    });

    const mailOptions = {
        from: 'birbumaxi@gmail.com',
        to,
        subject,
        text
    };

    return transporter.sendMail(mailOptions);
};
