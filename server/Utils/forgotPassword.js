import nodemailer from "nodemailer";

const Email = (options) => {
  let transporter = nodemailer.createTransport({
    auth: {
      user: process.env.USER, // email
      pass: process.env.PASSWORD, //password
    },
  });
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

// send email
const EmailSender = ({ email }) => {
  const options = {
    host: "smtp.example.com",
    port: 587,
    tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2"
    },
    from: `ShoeShop 🛍️ <duongbd67@gmail.com>`,
    to: 'duong891109@gmail.com',
    subject: "Message From Shoeshop Store",
    html: `
        <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
        <div style="max-width: 700px; background-color: white; margin: 0 auto">
          <div style="width: 100%; background-color: #00efbc; padding: 20px 0">
         
          
          </div>
          <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
            <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
              Form Shoeshop Store
            </p>
            <div style="font-size: .8rem; margin: 0 30px">
              <p>Email: <b>${email}</b></p>
            </div>
          </div>
        </div>
      </div>
        `,
  };

  Email(options);
};

export default EmailSender;
