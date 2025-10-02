import { Resend } from 'resend';
import { ENV } from './env.js';

if (!ENV.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is not defined');
}

export const resendClient = new Resend(ENV.RESEND_API_KEY);

if (!ENV.EMAIL_FROM || !ENV.EMAIL_FROM_NAME) {
  throw new Error(
    'EMAIL_FROM and EMAIL_FROM_NAME environment variables must be defined'
  );
}

export const sender = {
  email: ENV.EMAIL_FROM,
  name: ENV.EMAIL_FROM_NAME,
};
