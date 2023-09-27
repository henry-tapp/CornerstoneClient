import React from "react";
import ReactDOM from "react-dom/client";

import { disableReactDevTools } from '@fvilers/disable-react-devtools'

// import reportWebVitals from "../../reportWebVitals";
import App from "./common/App";
import { MainRouter } from "MainRouter";
import { Bar as NavigationBar } from "pages/Navigation/Bar";

if (import.meta.env.MODE === 'production') {
  disableReactDevTools()
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (import.meta.env.MODE === "development") {
  import("./mocks/browser")
    .then(({ worker }) => {
      // Start the worker.
      worker.start();
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
        <MainRouter />
        <NavigationBar />
      </App>
    </React.StrictMode>
  );
}