export default {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  scope: process.env.SCOPE,
  domain: process.env.DOMAIN,
  redirectUri: process.env.REDIRECT_URI,
  postLogoutRedirectUri: process.env.POST_LOGOUT_REDIRECT_URI,
  session: {
    cookieSecret: process.env.SESSION_COOKIE_SECRECT,
    cookieLifetime: process.env.SESSION_COOKIE_LIFE_TIME,
  },
};
