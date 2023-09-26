import React from "react";
import ReactDOM from "react-dom/client";

// import reportWebVitals from "../../reportWebVitals";
import App from "./common/App";
import { MainRouter } from "MainRouter";
import { Bar as NavigationBar } from "pages/Navigation/Bar";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const Header = styled(Typography)`
  padding: 1rem;
  font-weight: bold;
  position: absolute;  
  right: 0;  
  top: 1;
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App disableResponsiveComp>

      <Header variant="h3">RockD</Header>
      <MainRouter />
      <NavigationBar />
    </App>
  </React.StrictMode>
);

// reportWebVitals(log.debug);