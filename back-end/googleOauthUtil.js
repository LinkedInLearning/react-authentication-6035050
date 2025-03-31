const { google } = require('googleapis');
const { db, saveDb } = require('./db');

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

const getGoogleUser = async (code) => {
  const { tokens } = await oauthClient.getToken(code);
  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.accessToken}`,
    { headers: { Authorization: `Bearer ${tokens.id_token}` } },
  )
  return response.data;
}

module.exports = { getGoogleOauthUrl, getGoogleUser };