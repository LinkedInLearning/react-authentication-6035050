const { google } = require('googleapis');

const oauthClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'https://automatic-space-memory-96gv4ggqw7pcxx4x-3000.app.github.dev/auth/google/callback',
);

const getGoogleOauthUrl = () => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ];

  return oauthClient.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
  });
}

module.exports = { getGoogleOauthUrl };