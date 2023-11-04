import { Auth0Provider, CacheLocation, useAuth0 } from '@auth0/auth0-react';
import ReactDOM from "react-dom/client";

import { disableReactDevTools } from '@fvilers/disable-react-devtools';

// import reportWebVitals from "../../reportWebVitals";
import { styled } from "@mui/material/styles";
import { MainRouter } from "MainRouter";
import { getConfig } from "config";
import { useLocalStorage } from 'hooks/useLocalStorage/useLocalStorage';
import Home from "pages/Home";
import { Bar as NavigationBar } from "pages/Navigation/Bar";
import Wizard from 'pages/Wizard';
import { Plan } from 'types';
import App, { ITheme } from "./common/App";

if (import.meta.env.MODE === 'production') {
  disableReactDevTools()
}

const Wrapper = styled("div")(({ theme }) => `
    background: ${(theme as ITheme).palette.primary.dark};
    color: ${(theme as ITheme).palette.shades.g4};
    min-height: 100vh;
`);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (import.meta.env.MODE === "mock") {

  import("./mocks/browser")
    .then(({ worker }) => {
      // Start the worker.
      worker.start({
        onUnhandledRequest: ({ method, url }) => {
          if (!url.toString().includes("/src/") && !url.toString().includes("/node_modules/")) {
            throw new Error(`Unhandled ${method} request to ${url}`);
          }
        }
      });

    })
    .then(() => {
      root.render(
        <Main />
      );
    });
}
else {
  root.render(
    <Main />
  );
}

const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  authorizationParams: {
    redirect_uri: window.location.origin + "/#/dashboard",
    scope: "openid profile email offline_access",
    useRefreshTokensFallback: true,
    ...(config.audience ? { audience: config.audience } : null),
  },
  useRefreshTokens: true,
  cacheLocation: "localstorage" as CacheLocation
};

function Main() {

  return (
    <Auth0Provider
      {...providerConfig}
    >
      <App disableResponsiveComp >
        <AuthCheck />
      </App>
    </Auth0Provider>
  );
}

function AuthCheck() {

  const {
    isAuthenticated
  } = useAuth0();

  return (<>
    {isAuthenticated ? <AuthenticatedView /> : <Home />}
  </>
  )
}

function AuthenticatedView() {

  const [planId, setPlanId] = useLocalStorage("planId", "");

  return (
    <Wrapper className="wrapper">
      {planId !== ""
        ? (<><MainRouter /><NavigationBar /></>)
        : <Wizard onPlanCreated={(plan: Plan) => setPlanId(plan.id)} />
      }

    </Wrapper>
  )
}