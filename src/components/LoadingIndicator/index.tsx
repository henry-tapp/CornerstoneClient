import "./loadingIndicator.css";

import { styled } from "@mui/material/styles";

const CenterContentWrapper = styled("div")`
  height: 100%;

  display: grid;
  place-content: center;
  place-items: center;
`;

/**
 * A simple indeterminate loading indicator.
 */
export function LoadingIndicator({
  className,
  style,
  fullscreen = false,
}: {
  className?: string;
  style?: React.CSSProperties;
  fullscreen?: boolean;
}) {
  const classes = ["loading__indicator, loading-indicator", "lds-facebook"];
  if (className) {
    classes.push(className);
  }
  return (
    <div className={`loading-wrapper ${fullscreen ? "fullscreen" : ""}`}>
      <div className={classes.join(" ")} style={style}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export const FullpageLoadingIndicator = () => (
  <CenterContentWrapper className="suspense-loading-wrapper">
    <LoadingIndicator fullscreen className="loading-indicator" />
  </CenterContentWrapper>
);
