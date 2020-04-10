import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
  clientId: "l1keDl8WzkVwWXFwh04BJazX2WXFnJPH",
  clientSecret:
    "Wt_GK7mSpZmIkBgnYg38h7JpPjVjg7S_OuCV3a4pyQ8ZP9euv9qQj4f-5190Y2Mt",
  scope: "openid profile",
  domain: "fullstacklab-mydailystatus.auth0.com",
  redirectUri: "http://localhost:3000/api/callback",
  postLogoutRedirectUri: "http://localhost:3000/",
  session: {
    cookieSecret: "gighmmpiobklfepjocnamgkkbiglidom",
    cookieLifetime: 3600,
  },
});
