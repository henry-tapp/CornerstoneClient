import React from "react";
import { HashRouter, MemoryRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";

import { LinkPersistQuery } from "./";

it("renders without crashing", () => {
  render(<LinkPersistQuery pathname="">A Link</LinkPersistQuery>, {
    wrapper: HashRouter,
  });
});

it("maintains the query string in the link", () => {
  const initialRoute = {
    pathname: "/somePath",
    search: "?authToken=123&theme=party",
  };
  const { asFragment } = render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <LinkPersistQuery pathname="/somePath">A Link</LinkPersistQuery>
    </MemoryRouter>
  );

  expect(screen.getByText(/A Link/i)).toBeInTheDocument();
  expect(screen.getByRole("link")).toHaveAttribute(
    "href",
    "/somePath?authToken=123&theme=party"
  );
  expect(asFragment()).toMatchSnapshot();
});

it("adds the .active class if the path matches", () => {
  const initialRoute = {
    pathname: "/somePath",
    search: "?authToken=123&theme=party",
  };
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <LinkPersistQuery pathname="/somePath">A Link</LinkPersistQuery>
    </MemoryRouter>
  );

  expect(screen.getByText(/A Link/i)).toBeInTheDocument();
  expect(screen.getByRole("link")).toHaveClass("active");
});

it("adds the .active class if the path is a decendant", () => {
  const initialRoute = {
    pathname: "/somePath/achildpath",
    search: "?authToken=123&theme=party",
  };
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <LinkPersistQuery pathname="/somePath">A Link</LinkPersistQuery>
    </MemoryRouter>
  );

  expect(screen.getByText(/A Link/i)).toBeInTheDocument();
  expect(screen.getByRole("link")).toHaveClass("active");
});

it("does not add the .active class if the path doesn't match", () => {
  const initialRoute = {
    pathname: "/someOtherPath",
    search: "?authToken=123&theme=party",
  };
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <LinkPersistQuery pathname="/somePath">A Link</LinkPersistQuery>
    </MemoryRouter>
  );

  expect(screen.getByText(/A Link/i)).toBeInTheDocument();
  expect(screen.getByRole("link")).not.toHaveClass("active");
});
