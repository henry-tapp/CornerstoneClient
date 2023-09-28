import { MenuItem, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ITheme } from "common/App";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";

const PageWrapper = styled("div")`
  width: calc(100% - 2rem);
  padding-top: 0.5rem;
  background: white;
  text-align: center;
  padding:1rem;
`;

const Section = styled("div")(({ theme }) => `
    text-align: left;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: ${(theme as ITheme).palette.shades.g5};
    color:  ${(theme as ITheme).palette.shades.g1};
`);

const FormArea = styled(TextField)(({ theme }) => `
    border-radius: 0.5rem;
    border: none;
`);

export function Account() {

  const [Condensed, setCondensed] = useLocalStorage("Condensed", "");

  let options = ["Condensed", "Expanded"];

  return (
    <PageWrapper>
      <Typography variant="h2">Account</Typography>
      <Section>
        <Typography variant="h5">Preferences</Typography>
        <br />
        <FormArea
          id="outlined-select-currency"
          select
          label="Accessibility"
          defaultValue={Condensed ? "Condensed" : "Expanded"}
          helperText="Choose a view that works for you"
          onChange={(val) => setCondensed(val.target.value === "Condensed")}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </FormArea>
      </Section>
    </PageWrapper>
  );
}

export default Account;
