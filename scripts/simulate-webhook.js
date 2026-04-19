const crypto = require('crypto');

async function main() {
  const secret = process.env.GITHUB_WEBHOOK_SECRET || 'test_secret';
  
  const payload = {
    action: 'closed',
    pull_request: {
      merged: true,
      user: {
        login: 'testuser',
        email: null
      },
      commits_url: 'https://api.github.com/repos/Varnan-Tech/opendirectory/pulls/3/commits' // Using PR #3 to get works.farizanjum@gmail.com
    }
  };

  const bodyText = JSON.stringify(payload);
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(bodyText).digest('hex');

  console.log('Sending webhook simulation...');
  try {
    const response = await fetch('http://localhost:3000/api/webhooks/github', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hub-signature-256': digest
      },
      body: bodyText
    });

    const result = await response.json();
    console.log('Webhook response:', response.status, result);
  } catch (err) {
    console.error('Failed to send webhook:', err.message);
    console.log('Make sure the Next.js server is running on port 3000 with GITHUB_WEBHOOK_SECRET=test_secret');
  }
}

main().catch(console.error);
