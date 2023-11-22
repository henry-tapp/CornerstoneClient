import { useAuth0 } from '@auth0/auth0-react';
import ReactDOM from "react-dom/client";

import { disableReactDevTools } from '@fvilers/disable-react-devtools';

// import reportWebVitals from "../../reportWebVitals";
import { styled } from "@mui/material/styles";
import { MainRouter } from "MainRouter";
import { usePlan } from 'hooks/usePlan/usePlan';
import Home from "pages/Home";
import { Bar as NavigationBar } from "pages/Navigation/Bar";
import Wizard from 'pages/Wizard';
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
        <Index />
      );
    });
}
else {
  root.render(
    <Index />
  );
}


function Index() {

  return (
    <App disableResponsiveComp >
      <AuthCheck />
    </App>
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

  const plan = usePlan({});

  return (
    <Wrapper className="wrapper">
      {!!plan.data
        ? (<><MainRouter /></>)
        : <Wizard />
      }
    </Wrapper>
  )
}
