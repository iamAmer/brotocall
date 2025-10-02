import { resendClient, sender } from '../config/resend.js';
import { createWelcomeEmailTemplate } from '../emails/emailTemplates.js';
import colors from 'colors';

export const sendWelcomeEmails = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: `Welcome to Brotocall!`,
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (error) {
    console.error(colors.red(`Error sending welcome email: ${error}`));
    throw new Error('Failed to send welcome email!');
  }

  console.log(`Welcome email sent successfully!`)
};
