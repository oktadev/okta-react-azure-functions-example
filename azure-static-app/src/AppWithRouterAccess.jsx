import "./App.css";

import { Route, useHistory } from "react-router-dom";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, LoginCallback } from "@okta/okta-react";

import Home from "./Home";

const oktaAuth = new OktaAuth({
  issuer: "https://{yourOktaDomain}/oauth2/default",
  clientId: "{yourClientId}",
  redirectUri: window.location.origin + "/login/callback",
});

function AppWithRouterAccess() {
  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Route path="/" component={Home} />
      <Route path="/login/callback" component={LoginCallback} />
    </Security>
  );
}

export default AppWithRouterAccess;
