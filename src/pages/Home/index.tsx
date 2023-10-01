import { styled } from "@mui/material/styles";

import Dashboard from "./Dashboard";

const PageWrapper = styled("div")`
  width: 100%;
  padding-top: 1rem;
  display: flex;
  flex-direciton: row;
  align-content: center;
  justify-content: center;
`;

export function Home() {

  return (
    <PageWrapper>
      <Dashboard />
    </PageWrapper>
  );
}

export default Home;