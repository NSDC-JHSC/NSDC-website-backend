import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  // host: process.env.SMTP_HOST,
  // port: parseInt(process.env.SMTP_PORT, 10),
  // secure: false,

  // for gmail
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
  return info;
};

export const verificationEmailTemplate = (verifyLink) => `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f5f6fa; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

      <h2 style="
        text-align: center;
        color: #1a237e;
        margin-bottom: 10px;
      ">
        NSDC JHSC – Email Verification
      </h2>

      <p style="font-size: 15px; color: #333;">
        Dear User,
      </p>

      <p style="font-size: 15px; color: #333; line-height: 1.6;">
        Thank you for registering with the 
        <strong>National Students Data Corps – Jamia Hamdard Student Chapter (NSDC JHSC)</strong>.
      </p>

      <p style="font-size: 15px; color: #333; line-height: 1.6;">
        Please verify your email address to activate your account. Click the button below to complete the verification:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${verifyLink}"
          style="
            background-color: #1a73e8;
            color: #ffffff;
            padding: 12px 22px;
            text-decoration: none;
            font-size: 16px;
            border-radius: 6px;
            font-weight: bold;
            display: inline-block;
          ">
          Verify My Email
        </a>
      </div>

      <p style="font-size: 14px; color: #555; line-height: 1.6;">
        If the button above does not work, please copy and paste the link below into your browser:
      </p>

      <p style="word-break: break-all; font-size: 14px; color: #1a73e8;">
        ${verifyLink}
      </p>

      <p style="font-size: 14px; color: #555; margin-top: 20px;">
        This verification link will expire soon. If you did not initiate this request, you may safely ignore this email.
      </p>

      <br/>

      <p style="font-size: 15px; color: #333;">
        Best regards,<br/>
        <strong>NSDC JHSC Support Team</strong>
      </p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

      <p style="font-size: 12px; color: #777; text-align: center; line-height: 1.5;">
        This is a computer-generated email. Please do not reply to this message.<br/>
        For any support or queries, kindly visit the official NSDC JHSC website.
      </p>

    </div>
  </div>
`;

export const resetEmailTemplate = (resetLink) => `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f5f6fa; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

      <h2 style="
        text-align: center;
        color: #1a237e;
        margin-bottom: 10px;
      ">
        NSDC JHSC – Password Reset Request
      </h2>

      <p style="font-size: 15px; color: #333;">
        Dear User,
      </p>

      <p style="font-size: 15px; color: #333; line-height: 1.6;">
        We received a request to reset your password for your 
        <strong>NSDC JHSC</strong> account.
      </p>

      <p style="font-size: 15px; color: #333; line-height: 1.6;">
        Click the button below to create a new password:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}"
          style="
            background-color: #d32f2f;
            color: #ffffff;
            padding: 12px 22px;
            text-decoration: none;
            font-size: 16px;
            border-radius: 6px;
            font-weight: bold;
            display: inline-block;
          ">
          Reset My Password
        </a>
      </div>

      <p style="font-size: 14px; color: #555; line-height: 1.6;">
        If the button above does not work, please copy and paste the link below into your browser:
      </p>

      <p style="word-break: break-all; font-size: 14px; color: #d32f2f;">
        ${resetLink}
      </p>

      <p style="font-size: 14px; color: #555; margin-top: 20px;">
        This password reset link will expire soon. If you did not request a password reset, please ignore this email. Your account will remain secure.
      </p>

      <br/>

      <p style="font-size: 15px; color: #333;">
        Best regards,<br/>
        <strong>NSDC JHSC Support Team</strong>
      </p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

      <p style="font-size: 12px; color: #777; text-align: center; line-height: 1.5;">
        This is a computer-generated email. Please do not reply to this message.<br/>
        For any support or queries, kindly visit the official NSDC JHSC website.
      </p>

    </div>
  </div>
`;
