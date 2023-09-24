import { PropsWithChildren } from "react";

import { styled } from "@mui/material/styles";

const StyledResponsiveRootLayout = styled("div")<{
  width?: string | number | null;
  height?: string | number | null;
}>`
  position: relative;
  width: ${(props) => props.width ?? "100vw"};
  height: ${(props) => props.height ?? "100vh"};

  background: transparent;
`;

/**
 * This component just handles the overall sizing of the whole "app".
 * By default it will try to fill the whole viewport by using 100vw / vh css styles (which is generally not nice but meh).
 * If the width/height values are set (which ultimately would likely come from query args) then it will forcably use those values instead.
 *
 * The idea is this wraps the whole site.
 *
 * How all this works is incredibly sketchy and not too reliable it seems, so we need to figure
 * out a nice way to handle all the sizing across ALL the components. This only really works "well"
 * in its default state for the Home component
 */
export function ResponsiveRootLayout({
  children,
  width,
  height,
  disabled,
}: PropsWithChildren<{
  width?: number | string | null | undefined;
  height?: number | string | null | undefined;
  disabled?: boolean;
}>) {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <StyledResponsiveRootLayout
      width={width}
      height={height}
      className="responsive-root-layout"
    >
      {children}
    </StyledResponsiveRootLayout>
  );
}
