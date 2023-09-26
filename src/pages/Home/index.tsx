
import { styled } from "@mui/material/styles";
import { NavigationButtons } from "../Navigation/NavigationButtons";
import WeekView from "./WeekView";

const NavContainer = styled("div")`
  position: absolute;
  top: 3rem;
  width: 100%;
`;



export function Index() {

  // const { authToken } = useAppArguments();

  return (
    <NavContainer>
      <NavigationButtons />
      <WeekView />
    </NavContainer>
  );
}
