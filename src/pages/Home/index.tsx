import { LoadingIndicator } from "components/LoadingIndicator";
import { lazy, Suspense } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router";

import { styled } from "@mui/material/styles";

import { Typography } from "@mui/material";
import { NavigationButtons } from "./NavigationButtons";
import { Home } from "./Home";

const Header = styled(Typography)`
  padding: 1rem;
  font-weight: bold;
`;



export function Index() {

  // const { authToken } = useAppArguments();

  return (
    <>
      <Header variant="h3">RockD</Header>
      <NavigationButtons />
    </>
  );
}
