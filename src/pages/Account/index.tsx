import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ITheme } from "common/App";

import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';


const PageWrapper = styled("div")(({ theme }) => `
  width: calc(100% - 2rem);
  padding-top: 0.5rem;
  text-align: center;
  padding:1rem;
  color: ${(theme as ITheme).palette.shades.g4};
`);

const Section = styled("div")(({ theme }) => `
    text-align: left;
    padding: 1rem;
    border-radius: 0.5rem;
`);

const StyledButton = styled(Button)(({ theme }) => `
    background: ${(theme as ITheme).palette.shades.g5};
    color: ${(theme as ITheme).palette.shades.g1};
    border-radius: 0.5rem;
`);

export function Account() {

  const { user, logout } = useAuth0();

  return (
    <PageWrapper>
      <Section>
        <Typography variant="h5">Email: {user?.name}</Typography>
        <StyledButton type="button" onClick={() => logout()}>
          <Typography variant="subtitle1">Log Out</Typography>
        </StyledButton>
      </Section>
    </PageWrapper >
  );
}

export default Account;
