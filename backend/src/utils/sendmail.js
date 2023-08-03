import nodemailer from 'nodemailer';
const sendMail = async ({subject, message, toemail}) => {
    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport(
        {
            host: process.env.MAILTRAP_SMTP_HOST ,
            port: process.env.MAILTRAP_SMTP_PORT,
            //secure: true/false,
            auth: {
                user: process.env.MAILTRAP_SMTP_USER,
                pass: process.env.MAILTRAP_SMTP_PASSWORD
            },
            //logger: true,
            //transactionLog: true, // include SMTP traffic in the logs
            //allowInternalNetworkInterfaces: false
        }
    );    

    // Message object
    let mailMessage = {
        from: process.env.MAILTRAP_FROM_EMAIL || 'Nodemailer <noreply@nodemailer.com>',

        // Comma separated list of recipients
        to: toemail || 'Peter <earthweb21st@gmail.com>',
        //bcc: 'andris@ethereal.email',

        // Subject of the message
        subject: subject || 'Nodemailer is unicode friendly ✔',

        // plaintext body
        //text: 'Hello to myself!',

        // HTML body
        html: message,

        // An array of attachments
        /* attachments: [
            // String attachment
            {
                filename: 'notes.txt',
                content: 'Some notes about this e-mail',
                contentType: 'text/plain' // optional, would be detected from the filename
            },

            // Binary Buffer attachment
            {
                filename: 'image.png',
                content: Buffer.from(
                    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                        '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                        'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                    'base64'
                ),

                cid: 'note@example.com' // should be as unique as possible
            },

            // File Stream attachment
            {
                filename: 'nyan cat ✔.gif',
                path: __dirname + '/assets/nyan.gif',
                cid: 'nyan@example.com' // should be as unique as possible
            }
        ] */
    };

    let info = await transporter.sendMail(mailMessage);
    console.log('Message sent successfully as %s', info.messageId);
}

export default sendMail;