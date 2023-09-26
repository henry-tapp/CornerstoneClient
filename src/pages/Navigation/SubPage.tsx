import { LinkPersistQuery } from "components/LinkPersistQuery";
import { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const SubpageWrapper = styled("div")(
  ({ theme }) => `
  padding-top: 3rem;
  position: relative;
`
);

const BackIconWrapper = styled("div")(
  ({ theme }) => `
  position: absolute;
  left: 0.5rem;
  top: 1.25rem;
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
  className?: string;
}

export function SubPage({
  backTo,
  backLast,
  children,
  style,
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
          <BackIconWrapper><ArrowBackIosNewIcon /></BackIconWrapper>
        </LinkPersistQuery>
      )}
      {children}
    </SubpageWrapper>
  );
}
