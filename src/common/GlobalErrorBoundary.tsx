import { SiteError } from "components/SiteError";
import React, { PropsWithChildren } from "react";

import { styled } from "@mui/material/styles";

const ErrorContainer = styled("div")(
  ({ theme }) => `
  background-color: ${theme.palette.primary.main};
  border-radius: ${theme.shape.borderRadius};
  width: 100%;
  height: 100%;
`
);

export class GlobalErrorBoundary extends React.Component<
  PropsWithChildren,
  { error: unknown }
> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: unknown) {
    // Update state so the next render will show the fallback UI.
    return { error: error };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // You can also log the error to an error reporting service
    // console.error(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorContainer className="global-error-boundary">
          <SiteError message={(this.state.error as Error)?.message} />
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}
