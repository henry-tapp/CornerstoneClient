import { styled } from "@mui/material/styles";

import Dashboard from "./Dashboard";

const PageWrapper = styled("div")`
  width: 100%;
`;

export function Home() {

  return (
    <PageWrapper>
      <Dashboard />
    </PageWrapper>
  );
}

export default Home;