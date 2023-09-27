import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

import LogoImg from '../../images/Logo.jpg'
import Dashboard from "./Dashboard";

const PageWrapper = styled("div")`
  width: 100%;
  padding-top: 1rem;
  display: flex;
  flex-direciton: row;
  align-content: center;
  justify-content: center;
`;

const Header = styled(Typography)`
  font-weight: bold;
  padding-left: 0.5rem;
`;

export function Home() {

  return (
    <PageWrapper>
      <img style={{ height: "2rem" }} src={LogoImg} alt="failed"></img>
      <Header variant="h3">RockD</Header>
      <Dashboard />
    </PageWrapper>
  );
}

export default Home;