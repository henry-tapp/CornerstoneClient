import React from "react";

import { render, screen } from "@testing-library/react";

import { TextDivider } from "./";

it("renders without crashing", () => {
  const { asFragment } = render(<TextDivider text="OR" />);

  expect(screen.getByTestId("text-divider-left")).toBeInTheDocument();
  expect(screen.getByTestId("text-divider-right")).toBeInTheDocument();
  expect(screen.getByText(/OR/i)).toBeInTheDocument();

  expect(asFragment()).toMatchSnapshot();
});

it("only renders a single hr if no text provided", () => {
  const { asFragment } = render(<TextDivider />);

  expect(screen.getByTestId("text-divider-left")).toBeInTheDocument();

  expect(asFragment()).toMatchSnapshot();
});
