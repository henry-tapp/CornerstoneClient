import { Menu, MenuItem, MenuProps, TextField, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { ITheme } from "common/App";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { useState } from "react";

import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
    width: 100%;
`);

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    width: "calc(100% - 2rem)",
    backgroundColor: theme.palette.primary.main,
    color: (theme as ITheme).palette.shades.g4,

    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '0.25rem 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export function Account() {

  const [Condensed, setCondensed] = useLocalStorage("Condensed", false);

  let options = ["Condensed", "Expanded"];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setCondensed(index === 0)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <PageWrapper>
      <Typography variant="h2">Account</Typography>
      <Section>
        <Typography variant="h5">Preferences</Typography>
        <br />
        <StyledButton
          id="menu-button"
          aria-controls={open ? 'menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          {Condensed ? 'Condensed' : 'Expanded'}
        </StyledButton>
        <StyledMenu
          MenuListProps={{
            'aria-labelledby': 'menu-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {options.map((option, index) => (
            <MenuItem onClick={(event) => handleMenuItemClick(event, index)} key={option} value={option} disableRipple>
              {option}
            </MenuItem>
          ))}
        </StyledMenu>
      </Section>
    </PageWrapper>
  );
}

export default Account;
