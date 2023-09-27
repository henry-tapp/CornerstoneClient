// This is needed for our use of @font-face in styles/baseTheme.css
import "@/fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Regular.ttf";
import "style/baseTheme.css";
// Setup our translations
import "util/i18n";

import { FullpageLoadingIndicator } from "components/LoadingIndicator";
// import { useApiMocking } from "hooks/useApiMocking";
import log from "loglevel";
import React, { Suspense, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { SkeletonTheme } from "react-loading-skeleton";
import Modal from "react-modal";
import { HashRouter } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  Palette,
  Theme,
  ThemeOptions,
} from "@mui/material/styles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  AppArgumentsConsumer,
  AppArgumentsProvider,
} from "./AppArgumentsProvider";
import { AuthConsumer, AuthProvider } from "./AuthProvider";
import { DynamicThemeProvider } from "./DynamicThemeProvider";
import { GlobalErrorBoundary } from "./GlobalErrorBoundary";

// Required if we're using @mui/lab - https://mui.com/material-ui/about-the-lab/
import type { } from "@mui/lab/themeAugmentation";

// https://mui.com/material-ui/experimental-api/css-theme-variables/usage/#typescript
import type { } from "@mui/material/themeCssVarsAugmentation";
import { QueryProvider } from "./RockdQueryProvider";
import { ResponsiveRootLayout } from "components/ResponsiveRootLayout";
import { useApiMocking } from "hooks/useApiMocking/useApiMocking";

declare module "@mui/material/styles" {
  // Example for adding custom palette options and supporting it in TypeScript
  // interface PaletteOptions {
  //   gradient: string;
  //   border: {
  //     subtle: string;
  //   };
  // }
  // interface Palette {
  //   gradient: string;
  //   border: {
  //     subtle: string;
  //   };
  // }
}

/**
 * TODO: Move to use the new-ish feature - https://mui.com/material-ui/experimental-api/css-theme-variables/overview/
 * Which will allow us to directly use CSS variables to control MUI!
 */

interface IPalette extends Palette {
  tertiary: {
    main: string;
    dark: string;
    light: string;
  };
  shades: {
    g0: string;
    g1: string;
    g2: string;
    g3: string;
    g4: string;
    g5: string;
    g6: string;
  };
}

export interface ITheme extends Theme {
  palette: IPalette;
}

export interface IThemeOptions extends ThemeOptions {
  palette: IPalette;
}

const theme = extendTheme({
  // We're no longer using a custom prefix, so it's --mui-xxx
  typography: {
    fontFamily: [
      "MPLUSRounded1c-Regular",
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontSize: "2.125rem",
      fontStyle: "normal",
      fontWeight: "300",
      lineHeight: "4.5rem",
    },
    h2: {
      fontSize: "2.125rem",
      fontStyle: "normal",
      fontWeight: "300",
      lineHeight: "3rem",
      letterSpacing: "0.015rem",
    },
    h3: {
      fontSize: "1.5rem",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "2rem",
    },
    h4: {
      fontSize: "1.125rem",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "1.75rem",
      letterSpacing: "0.01rem",
    },
    h5: {
      fontSize: "1rem",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "1.5rem",
      letterSpacing: "0.01rem",
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "1.25rem",
      letterSpacing: "0.01rem",
    },
    subtitle2: {
      fontSize: "0.75rem",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "1rem",
      letterSpacing: "0.01rem",
    },
    body1: {
      fontSize: "1rem",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "1.5rem",
      letterSpacing: "0.0275rem",
    },
    body2: {
      fontSize: "0.875rem",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "1.25rem",
      letterSpacing: "0.015rem",
    },
    button: {
      fontSize: "0.875rem",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "1.25rem",
      letterSpacing: "0.05rem",
    },
    caption: {
      fontSize: "0.75rem",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "1rem",
      letterSpacing: "0.025rem",
    },
    overline: {
      fontSize: "0.625rem",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "1rem",
      letterSpacing: "0.05rem",
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 16
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#311E10",
          dark: "#27180d",
          light: "#744726",
        },
        secondary: {
          main: "#DD6031",
          dark: "#b9491f",
          light: "#e4805a",
        },
        tertiary: {
          main: "#EABE7C",
          dark: "#e09f3e",
          light: "#eecb96",
        },
        // Missing Accesso Tertiary
        success: {
          main: "#D9DD92",
          dark: "#c5cc5a",
          light: "#e1e4a8",
        },
        error: {
          main: "#DE1B3C",
          dark: "#851024",
          light: "#E44863",
        },
        warning: {
          main: "#FFCD29",
          dark: "#997B19",
          light: "#FFD754",
        },
        shades: {
          g0: "#000000",
          g1: "#1A1A1A",
          g2: "#474747",
          g3: "#BABABA",
          g4: "#D8D8D8",
          g5: "#F2F2F2",
          g6: "#FFFFFF",
        },
      },
    } as IThemeOptions,
  }
});

// remove the `light` color scheme to optimize the HTML size
// @ts-ignore 2790
delete theme.colorSchemes.dark;


Modal.setAppElement("#root");

function ApiMocking() {
  useApiMocking();
  return <></>;
}

function App({
  children,
  disableResponsiveComp,
  className,
}: React.PropsWithChildren<{
  disableResponsiveComp?: boolean;
  className?: string;
}>) {
  useEffect(() => {
    log.info("Version: ", import.meta.env.REACT_APP_DEPLOY_VERSION);
    log.info("Deployed: ", import.meta.env.REACT_APP_DEPLOY_TIME);
  }, []);

  return (
    <HelmetProvider>
      <HashRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <GlobalErrorBoundary>
            <AppArgumentsProvider>
              <AppArgumentsConsumer>
                {(appArgs) => (
                  <ResponsiveRootLayout
                    disabled={disableResponsiveComp}
                    width={appArgs.width}
                    height={appArgs.height}
                  >
                    <GlobalErrorBoundary>
                      <AuthProvider>
                        <AuthConsumer>
                          {(authData) => (
                            <QueryProvider
                              apiUrl={appArgs.apiUrl ?? "mock"}
                              clientOptions={appArgs.rawQueryString}
                              culture={appArgs?.culture ?? "en-US"} // TODO: Don't set defaults here let the server do that!
                              authMethod="Bearer"
                              authToken={authData.currentToken}
                            >
                              <ReactQueryDevtools initialIsOpen={false} />
                              <CssVarsProvider
                                theme={theme}
                                defaultMode="light"
                              >
                                <DynamicThemeProvider
                                  theme={appArgs?.style}
                                  prefix="themes/"
                                >
                                  <SkeletonTheme
                                    baseColor="var(--skeleton-base-color)"
                                    highlightColor="var(--skeleton-highlight-color)"
                                  >
                                    <Suspense
                                      fallback={<FullpageLoadingIndicator />}
                                    >
                                      <div className={className}>
                                        {children}
                                      </div>
                                    </Suspense>
                                  </SkeletonTheme>
                                </DynamicThemeProvider>
                              </CssVarsProvider>
                            </QueryProvider>
                          )}
                        </AuthConsumer>
                      </AuthProvider>
                    </GlobalErrorBoundary>
                  </ResponsiveRootLayout>
                )}
              </AppArgumentsConsumer>
            </AppArgumentsProvider>
          </GlobalErrorBoundary>
        </QueryParamProvider>
      </HashRouter>
    </HelmetProvider>
  );
}

export default App;
