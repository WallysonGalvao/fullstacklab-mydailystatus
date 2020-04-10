import { initAuth0 } from "@auth0/nextjs-auth0";
import authConfig from "../config/auth";

export default initAuth0({
  clientId: authConfig.clientId,
  clientSecret: authConfig.clientSecret,
  scope: authConfig.scope,
  domain: authConfig.domain,
  redirectUri: authConfig.redirectUri,
  postLogoutRedirectUri: authConfig.postLogoutRedirectUri,
  session: authConfig.session,
});
