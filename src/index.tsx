import React from "react";
import ReactDOM from "react-dom/client";

import { disableReactDevTools } from '@fvilers/disable-react-devtools'

// import reportWebVitals from "../../reportWebVitals";
import App, { ITheme } from "./common/App";
import { MainRouter } from "MainRouter";
import { Bar as NavigationBar } from "pages/Navigation/Bar";
import { styled } from "@mui/material/styles";

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

if (import.meta.env.MODE === "development") {
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

function Main() {

  return (
    <React.StrictMode>
      <App disableResponsiveComp>
        <Wrapper className="wrapper">
          <MainRouter />
          <NavigationBar />
        </Wrapper>
      </App>
    </React.StrictMode>
  );
}