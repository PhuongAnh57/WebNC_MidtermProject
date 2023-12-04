const nodemailer = require('nodemailer');

const sendEmail = async (message) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.EMAIL_SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail(message);
        console.log('Email sent successfully!');
    } catch (err) {
        console.log(err);
        console.log('Email cannot be sent. Something went wrong!');
    }
};

module.exports = {
    sendConfirmationEmail: (user, token) => {
        const message = {
            from: process.env.USER,
            to: user.email,
            subject: 'Activate Your Classroom Account',
            html: `
            <h3>Hello ${user.username}</h3>
            <p>Thank you for registering into our application. Click on the link below to verify your email: </p>
            <a href="${process.env.BASE_URL}/api/users/${user.id}/email-confirm/${token}"> Activate Account Link </a>
            <p>Best,</p>
            <p>Your Classroom Team</p>
            `,
        };

        return sendEmail(message);
    },

    sendResetPasswordEmail: (user, hash) => {
        const message = {
            from: process.env.USER,
            to: user.email,
            subject: 'Reset your Classroom password',
            html: `
            <h3>Hello ${toUser.username} </h3>
            <p>Click on the link below to reset your password: </p>
            <a target="_" href="${process.env.BASE_URL}/api/reset-password/${hash}">Reset Password Link</a>
            <p>Best,</p>
            <p>Your Classroom Team</p>`,
        };

        return sendEmail(message);
    },
};
