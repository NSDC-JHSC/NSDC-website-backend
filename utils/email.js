const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
  return info;
};

const verificationEmailTemplate = (verifyLink) => `
  <h2>Verify your email</h2>
  <p>Please click the link below to verify your email:</p>
  <p><a href="${verifyLink}">${verifyLink}</a></p>
  <p>This link will expire soon.</p>
`;

const resetEmailTemplate = (resetLink) => `
  <h2>Reset your password</h2>
  <p>Please click the link below to reset your password:</p>
  <p><a href="${resetLink}">${resetLink}</a></p>
  <p>This link will expire soon.</p>
`;

module.exports = { sendEmail, verificationEmailTemplate, resetEmailTemplate };
