import { useAuth0 } from '@auth0/auth0-react';
import ReactDOM from "react-dom/client";

import { disableReactDevTools } from '@fvilers/disable-react-devtools';

// import reportWebVitals from "../../reportWebVitals";
import { styled } from "@mui/material/styles";
import { MainRouter } from "MainRouter";
import { CornerstoneDataProvider, useCornerstoneStableData } from 'common/CornerstoneDataProvider';
import SystemErrorPage from 'pages/Error/SystemErrorPage';
import Home from "pages/Home";
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

root.render(
  <App disableResponsiveComp >
    <AuthCheck />
  </App>
);

function AuthCheck() {

  const {
    isAuthenticated
  } = useAuth0();
  return (<>
    {isAuthenticated ?

      <CornerstoneDataProvider>
        <AuthenticatedView />
      </CornerstoneDataProvider> : <Home />}
  </>
  )
}

function AuthenticatedView() {

  const { plan } = useCornerstoneStableData();

  if (!plan) return (<SystemErrorPage />);
  return (
    <Wrapper className="wrapper">
      {!!plan
        ? (<><MainRouter /></>)
        : <Wizard />
      }
    </Wrapper >
  )
}
