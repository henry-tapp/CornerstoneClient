import React from "react";
import ReactDOM from "react-dom/client";

// import reportWebVitals from "../../reportWebVitals";
import App from "./common/App";
import { MainRouter } from "MainRouter";
import { Bar as NavigationBar } from "pages/Navigation/Bar";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

import LogoImg from 'images/Logo.jpg'

const Header = styled(Typography)`
  padding: 1rem;
  font-weight: bold;
  position: absolute;  
  right: 2.5rem;
`;

const Logo = styled("div")`
  position: absolute;
  right: 1rem;  
  top: 1rem; 
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App disableResponsiveComp>
      {/* <Logo><img style={{ height: "2rem" }} src={LogoImg} alt="failed"></img></Logo>
      <Header variant="h3">RockD</Header> */}
      <MainRouter />
      <NavigationBar />
    </App>
  </React.StrictMode>
);