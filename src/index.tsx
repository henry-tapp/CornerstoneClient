import React from "react";
import ReactDOM from "react-dom/client";

// import reportWebVitals from "../../reportWebVitals";
import App from "./common/App";
import { MainRouter } from "MainRouter";
import { Bar as NavigationBar } from "pages/Navigation/Bar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App disableResponsiveComp>
      <MainRouter />
      <NavigationBar />
    </App>
  </React.StrictMode>
);

// reportWebVitals(log.debug);