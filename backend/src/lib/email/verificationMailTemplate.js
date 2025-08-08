exports.verificationMailTemplate = (username, email, code, token) => `
  <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 30px;">
    <div style="max-width: 400px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #eee; padding: 24px;">
      <h2 style="color: #4F8EF7;">Welcome, ${username}!</h2>
      <p style="font-size: 16px; color: #333;">Thank you for registering. Please use the code below to verify your email address:</p>
      
      <div style="font-size: 32px; font-weight: bold; color: #4F8EF7; letter-spacing: 4px; margin: 24px 0;">${code}</div>

      <p style="font-size: 16px; color: #333;">Or simply click the button below to verify:</p>

      <div style="text-align: center; margin: 20px 0;">
        <a href="http://localhost:9000/api/users/verify-through-link?email=${encodeURIComponent(
          email
        )}&code=${code}&token=${token}" style="background-color: #4F8EF7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-size: 16px;">
          Verify Your Email
        </a>
        
      </div>

      <p style="font-size: 14px; color: #888;">If you did not request this, please ignore this email.</p>
      
      <div style="margin-top: 24px; text-align: center;">
        <img src="https://img.icons8.com/color/96/000000/verified-account.png" alt="verify" width="64"/>
      </div>
    </div>
  </div>
`;
