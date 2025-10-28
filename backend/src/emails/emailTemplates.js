// Escape HTML special characters to prevent XSS
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function createWelcomeEmailTemplate(name, CLIENT_URL) {
  // Validate inputs
  if (!name || typeof name !== 'string') {
    throw new Error('name must be a non-empty string');
  }
  if (!CLIENT_URL || typeof CLIENT_URL !== 'string') {
    throw new Error('CLIENT_URL must be a non-empty string');
  }

  // Validate URL format and protocol
  try {
    const url = new URL(CLIENT_URL);
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error('CLIENT_URL must use http or https protocol');
    }
  } catch (error) {
    throw new Error(`Invalid CLIENT_URL: ${error.message}`);
  }

  return `
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to BroToCall</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #ddd; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1529;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #4b2c82, #2d1b55); padding: 30px; text-align: center; border-radius: 16px 16px 0 0; box-shadow: 0 6px 20px rgba(0,0,0,0.4);">
      <img src="https://img.freepik.com/free-vector/hand-drawn-message-element-vector-cute-sticker_53876-118344.jpg" alt="BroToCall Logo" style="width: 70px; height: 70px; margin-bottom: 20px; border-radius: 50%; background-color: #fff; padding: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
      <h1 style="color: #f5f3fa; margin: 0; font-size: 26px; font-weight: 500; letter-spacing: 1px;">Welcome to BroToCall</h1>
    </div>
    
    <!-- Main -->
    <div style="background-color: #241a3a; padding: 35px; border-radius: 0 0 16px 16px; box-shadow: 0 6px 20px rgba(0,0,0,0.4);">
      <p style="font-size: 18px; color: #e0d7f5;"><strong>Hello ${escapeHtml(name)},</strong></p>
      <p style="color: #cbbde7;">Welcome to BroToCall, we’re so excited you’ve joined our community!</p>
      
      <div style="background: #2e214d; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 4px solid #6d4ab7;">
        <p style="font-size: 16px; margin: 0 0 15px 0; color: #dcd3f5;"><strong>Get started easily:</strong></p>
        <ul style="padding-left: 20px; margin: 0; color: #b9a9e7;">
          <li style="margin-bottom: 10px;">Set up your profile</li>
          <li style="margin-bottom: 10px;">Find your contacts</li>
          <li style="margin-bottom: 10px;">Start your first chat</li>
          <li style="margin-bottom: 0;">Share memories together</li>
        </ul>
      </div>
      
      <!-- Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${CLIENT_URL}" style="background: linear-gradient(135deg, #6d4ab7, #4b2c82); color: #fff; text-decoration: none; padding: 12px 30px; border-radius: 40px; font-weight: 500; display: inline-block; box-shadow: 0 4px 12px rgba(109,74,183,0.4);">
          Open BroToCall
        </a>
      </div>
      
      <p style="margin-bottom: 5px; color: #cbbde7;">Need help? We’re always here.</p>
      <p style="margin-top: 0; color: #a999cc;">Enjoy your new journey with us.</p>
      
      <p style="margin-top: 25px; margin-bottom: 0; color: #e0d7f5;">Warm regards,<br>The BroToCall Team</p>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; padding: 20px; color: #8e79c6; font-size: 12px;">
      <p>© 2025 BroToCall. All rights reserved.</p>
    </div>
  </body>
  </html>
  `;
}
