import sgMail from "@sendgrid/mail";

sgMail.setApiKey(
  process.env.SENDGRID_API_KEY
);
export async function sendMail(email: string, link: string) {
  var message = {
    to: email,
    from: "passwordReset@demo.com",
    subject: "Confrim Email",
    html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.
    Please click on the following link, or paste this into your browser to complete the process:
      ${link}
      If you did not request this, please ignore this email and your password will remain unchanged<p>`
  };

  await sgMail.send(message);
}
