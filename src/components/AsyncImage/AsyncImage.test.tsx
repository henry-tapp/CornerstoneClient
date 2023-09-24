import testImage from "mocks/images/128_Megacoaster_thumb.jpg";
import React from "react";

import { render, screen, waitFor } from "@testing-library/react";

import { test, beforeAll } from 'vitest';

import { AsyncImage } from "./";

  beforeAll(() => {
    global.document.createElement = (function (create) {
      return function () {
        //@ts-ignore
        const element: HTMLElement = create.apply(this, arguments);

        if (element.tagName.match(/img/i)) {
          setTimeout(() => {
            element.dispatchEvent(new Event("load"));
          }, 100);
        }
        return element;
      };
    })(document.createElement);
  });

  test("renders without crashing", () => {
    const { asFragment } = render(<AsyncImage />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("renders a specific loading state if forced via props.loading", async () => {
    render(<AsyncImage loading placeholder={<p>Loading</p>} />);

    const loadingWrapperEl = await screen.findByTestId(
      /async-image-loading-wrapper/i
    );
    expect(loadingWrapperEl).toBeInTheDocument();

    // I'm unsure if I prefer this approach OR the one just below where it finds by test for loading
    // expect(loadingWrapperEl.firstChild).toHaveTextContent(/Loading/i);

    const imgPlaceholderLoading = await screen.findByText(/Loading/i);
    expect(imgPlaceholderLoading).toBeInTheDocument();
  });

  test("renders the default loading state if forced via props.loading", async () => {
    render(<AsyncImage loading />);

    const loadingWrapperEl = await screen.findByTestId(
      /async-image-loading-wrapper/i
    );
    expect(loadingWrapperEl).toBeInTheDocument();

    expect(
      screen.getByTestId("async-image-default-loading")
    ).toBeInTheDocument();
  });

  test("sets alt text", () => {
    render(<AsyncImage alt="This is alt text" />);

    expect(screen.getByAltText(/This is alt text/i)).toBeInTheDocument();
  });

  test("renders a single valid image", async () => {
    render(
      <AsyncImage
        src={[testImage]}
        placeholder={<p>Loading</p>}
        errorFallback={<p>ErrorImage</p>}
      />
    );

    // const imgPlaceholderLoading = await screen.findByText(/Loading/i);
    // expect(imgPlaceholderLoading).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByText(/ErrorImage/i)).not.toBeInTheDocument()
    );

    await waitFor(() =>
      expect(screen.getByRole("img")).toHaveAttribute("src", testImage)
    );
  });

  test("falls back to error if image loading fails", async () => {
    // Override our default success mocking in beforeAll above
    global.document.createElement = (function (create) {
      return function () {
        //@ts-ignore
        const element: HTMLElement = create.apply(this, arguments);

        if (element.tagName.match(/img/i)) {
          setTimeout(() => {
            element.dispatchEvent(new Event("error"));
          }, 100);
        }
        return element;
      };
    })(document.createElement);

    render(
      <AsyncImage
        src={[testImage]}
        placeholder={<p>Loading</p>}
        errorFallback={<p>ErrorImage</p>}
      />
    );

    expect(await screen.findByText(/ErrorImage/i)).toBeInTheDocument();

    // await waitFor(() =>
    //   expect(screen.getByRole("img")).toHaveAttribute("src", "")
    // );
  });