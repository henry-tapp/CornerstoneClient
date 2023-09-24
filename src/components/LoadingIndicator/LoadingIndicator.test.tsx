import React from "react";

import { render } from "@testing-library/react";

import { LoadingIndicator } from "./";

it("renders without crashing", () => {
  render(<LoadingIndicator />);
});
