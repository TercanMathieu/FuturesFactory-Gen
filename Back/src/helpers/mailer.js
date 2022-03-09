const nodemailer = require('nodemailer');

exports.mailer = async (text, subject, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mathieutercan@gmail.com',
            pass: 'yrtorbfnhaqwfgap',
        },
    });
    const mailOptions = {
        from: 'Satoshi Studio <mathieutercan@gmail.com>',
        to: email,
        subject,
        text,
    };
    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log(err + result);
        } else {
            console.log('email sent');
        }
    });
};
