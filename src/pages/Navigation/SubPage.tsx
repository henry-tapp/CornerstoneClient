import { LinkPersistQuery } from "components/LinkPersistQuery";
import { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { IconButton } from "@mui/material";

const SubpageWrapper = styled("div")(
  ({ theme }) => `
  position: relative;
`
);

const BackIconWrapper = styled(IconButton)(
  ({ theme }) => `
  position: absolute;
  left: 1rem;
  border-radius: 0.5rem;
  background-color: rgba(186, 186, 186, 0.75);
`
);

interface SubPageProps {
  /**
   * If the back button is pressed, go to a specific pathname
   */
  backTo?: string;
  /**
   * If back button is pressed, go back to the last page
   */
  backLast?: boolean;
  /**
   * Whether the back button should be hidden. Default = false (shows button)
   */
  hideBackButton?: boolean;
  style?: CSSProperties;
  buttonStyle?: CSSProperties;
  className?: string;
}

export function SubPage({
  backTo,
  backLast,
  children,
  style,
  buttonStyle,
  hideBackButton,
}: React.PropsWithChildren<SubPageProps>) {
  const navigate = useNavigate();
  return (
    <SubpageWrapper style={style}>
      {!hideBackButton && (
        <LinkPersistQuery
          pathname={backLast ? ".." : backTo ?? "/"}
          onClick={
            !backLast
              ? undefined
              : (e) => {
                e.preventDefault();
                navigate(-1);
              }
          }
        >
          <BackIconWrapper style={{ top: buttonStyle?.top ?? "1rem" }}><KeyboardBackspaceOutlinedIcon /></BackIconWrapper>
        </LinkPersistQuery>
      )}
      {children}
    </SubpageWrapper>
  );
}
