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
            <div id="container" style=" display: flex; justify-content: center;">
            <div
                id="invitation"
                style="font-family: Roboto; padding: 16px 24px; border: 2px solid gray; max-width: 500px;"
            >
                <div
                    id="header" style="padding: 16px; background-color: #E5F6FD;">
                    <h1 style="fontWeight: 700; margin: 0;">
                        Classroom
                    </h1>
                </div>
                <div
                    id="body"
                    style="padding: 36px 36px 0; display: flex; flex-direction: column; align-items: flex-start;"
                >
                    <h3 style="color: rgba(0,0,0,0.87);">
                        Hello  ${user.username},
                    </h3>
                    <p>Thank you for registering into our application. Click on the link below to verify your email.</p>
                    <div
                        style="margin: 24px 0; padding: 12px; width: 150px; background-color: #2196F; align-self: center; font-size: 18px;"
                    >
                        <a
                            href="${process.env.CLIENT_URL}/api/user/email-confirm/${token}"
                            style="text-decoration: none; color: white;"
                        >
                            Activate Account
                        </a>
                    </div>
                    <p style="align-self: center;">
                        Instead, you can copy/paste this link into your browser.
                    </p>
                    <p style="padding: 16px; background-color: #E5F6FD; align-self: center;">
                    ${process.env.CLIENT_URL}/api/user/email-confirm/${token}
                    </p>
                </div>
            </div>
        </div>
            `,
        };

        return sendEmail(message);
    },

    sendResetPasswordEmail: (user, token) => {
        const message = {
            from: process.env.USER,
            to: user.email,
            subject: 'Reset your Classroom password',
            html: `
            <div id="container" style=" display: flex; justify-content: center;">
            <div
                id="invitation"
                style="font-family: Roboto; padding: 16px 24px; border: 2px solid gray; max-width: 500px;"
            >
                <div
                    id="header" style="padding: 16px; background-color: #E5F6FD;">
                    <h1 style="fontWeight: 700; margin: 0;">
                        Classroom
                    </h1>
                </div>
                <div
                    id="body"
                    style="padding: 36px 36px 0;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;"
                >
                    <h3 style="color: rgba(0,0,0,0.87);">
                        Hello  ${user.username},
                    </h3>
                    <p>Click on the button below to reset your password.</p>
                    <div
                        style="margin: 24px 0; padding: 12px; width: 150px; background-color: #2196FA; align-self: center; font-size: 18px;"
                    >
                        <a
                            href="${process.env.CLIENT_URL}/api/user/password-reset/${token}"
                            style="text-decoration: none; color: white;"
                        >
                            Reset Password
                        </a>
                    </div>
                    <p style="align-self: center;">
                        Instead, you can copy/paste this link into your browser.
                    </p>
                    <p style="padding: 16px; background-color: #E5F6FD; align-self: center;">
                    ${process.env.CLIENT_URL}/api/user/password-reset/${token}
                    </p>
                </div>
            </div>
        </div>
            `,
        };

        return sendEmail(message);
    },

    sendClassInvitaion: (email, classInfo, token, role) => {
        const message = {
            from: process.env.USER,
            to: email,
            subject: `Joining Mail`,
            html: `
            <h3>You are invited to join ${classInfo.class_name}</h3>
            <p>Click on the link below to enter the class: </p>
            <a target="_" href="${process.env.CLIENT_URL}/api/class/${
                classInfo.class_id
            }/invite/accept-token/${token}?role=${role === 'teacher' ? '2' : '3'}">Join in</a>,
       
            <div id="container" style=" display: flex; justify-content: center;">
            <div
                id="invitation"
                style="font-family: Roboto; padding: 16px 24px; border: 2px solid gray; max-width: 500px;"
            >       
                <div
                    id="header" style="padding: 16px; background-color: #E5F6FD;">
                    <h1 style="font-weight: 700; margin: 0;">
                        Classroom
                    </h1>
                </div>
                <div
                    id="body"
                    style="padding: 36px 36px 0;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;"
                >
                    <h3 style="color: rgba(0,0,0,0.87);">
                        Hello  ${email},
                    </h3>
                    <p>You are invited to join ${classInfo.class_name}</p>
                    <p>Click on the button below to reset your password.</p>
                    <div
                        style="
                        margin: 24px 0; 
                        padding: 12px; 
                        width: 150px; 
                        background-color: #2196FA; 
                        align-self: center; 
                        font-size: 18px;"
                    >
                        <a
                            href="${process.env.CLIENT_URL}/api/class/${
                classInfo.class_id
            }/invite/accept-token/${token}?role=${role}"
                            style="text-decoration: none; color: white;"
                        >
                           Join
                        </a>
                    </div>
                    <p style="align-self: center;">
                        Instead, you can copy/paste this link into your browser.
                    </p>
                    <p style="padding: 16px; background-color: #E5F6FD; align-self: center; text-align: center;">
                    ${process.env.CLIENT_URL}/api/class/${classInfo.class_id}/invite/accept-token/${token}?role=${
                role === 'teacher' ? '2' : '3'
            }
                    </p>
                </div>
            </div>
        </div>`,
        };

        return sendEmail(message);
    },
};
