import "@/fonts/M_PLUS_Rounded_1c/MPLUSRounded1c-Regular.ttf";
import "@fontsource/bebas-neue";
import "@fontsource/open-sans";
import type { } from "@mui/lab/themeAugmentation";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  Palette,
  Theme,
  ThemeOptions,
  experimental_extendTheme as extendTheme,
} from "@mui/material/styles";
import type { } from "@mui/material/themeCssVarsAugmentation";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FullpageLoadingIndicator } from "components/LoadingIndicator";
import { ResponsiveRootLayout } from "components/ResponsiveRootLayout";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import log from "loglevel";
import React, { Suspense, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { IntlProvider } from "react-intl";
import Modal from "react-modal";
import { HashRouter } from "react-router-dom";
import "style/baseTheme.css";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import "util/i18n";
import { GlobalErrorBoundary } from "./GlobalErrorBoundary";
import { QueryProvider } from "./QueryProvider";


interface IPalette extends Palette {

  tertiary: {
    main: string;
    dark: string;
    light: string;
  };

  fourth: {
    main: string;
    dark: string;
    light: string;
  }

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
    fontFamily: 'Bebas Neue',
    h1: {
      fontSize: "4rem",
      fontStyle: "normal",
      fontWeight: "800",
      lineHeight: "2rem",
      letterSpacing: "0.18rem",
    },
    h2: {
      fontSize: "3.5rem",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "2rem",
      letterSpacing: "0.015rem",
    },
    h3: {
      fontSize: "2.75rem",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "2rem",
    },
    h4: {
      fontSize: "2.5rem",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "1.75rem",
      letterSpacing: "0.01rem",
    },
    h5: {
      fontSize: "2rem",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "1.5rem",
      letterSpacing: "0.01rem",
    },
    subtitle1: {
      fontSize: "1.5rem",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "1.25rem",
      letterSpacing: "0.05rem",
    },
    subtitle2: {
      fontSize: "1.2rem",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "1rem",
      letterSpacing: "0.01rem",
    },
    body1: {
      fontSize: "1rem",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "1.25rem",
      letterSpacing: "0.04rem",
    },
    body2: {
      fontFamily: "Open Sans",
      fontSize: "0.8rem",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "1.2rem",
      letterSpacing: "0.0275rem",
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
          main: "#262938",
          dark: "#1c1f2b",
          light: "#3f455e",
          contrastText: "#D8D8D8"
        },
        secondary: {
          main: "#4c3ff9",
          dark: "#4833cc",
          light: "#5a40ff",
        },
        tertiary: {
          main: "#16f1b0",
          dark: "#04ccc9",
          light: "#05fffc"
        },
        fourth: {
          main: "#FF1E86",
          dark: "",
          light: ""
        },
        success: {
          main: "#83BCA9",
          dark: "#437c69",
          light: "#b5d7cb",
        },
        error: {
          main: "#d2aac0",
          dark: "#b26b92",
          light: "#F3E8EE",
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
        }
      },
    } as IThemeOptions,
  },
  transitions: {
    // So we have `transition: none;` everywhere
    create: () => 'none',
  },
});

// remove the `light` color scheme to optimize the HTML size
// @ts-ignore 2790
delete theme.colorSchemes.dark;


Modal.setAppElement("#root");

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

  const [reactDevTools] = useLocalStorage("reactDevTools", false);

  const apiUrl = import.meta.env.REACT_APP_API_URL;

  return (
    <HelmetProvider>
      <HashRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <GlobalErrorBoundary>
            <ResponsiveRootLayout
              disabled={disableResponsiveComp}
            >
              <GlobalErrorBoundary>
                <QueryProvider
                  apiUrl={apiUrl}
                  authMethod="Bearer"
                >
                  {reactDevTools && <ReactQueryDevtools initialIsOpen={false} />}
                  <CssVarsProvider
                    theme={theme}
                    defaultMode="light"
                  >
                    <Suspense
                      fallback={<FullpageLoadingIndicator />}
                    >
                      <IntlProvider locale="en-Gb">
                        <div className={className}>
                          {children}
                        </div>
                      </IntlProvider>
                    </Suspense>
                  </CssVarsProvider>
                </QueryProvider>
              </GlobalErrorBoundary>
            </ResponsiveRootLayout>
          </GlobalErrorBoundary>
        </QueryParamProvider>
      </HashRouter>
    </HelmetProvider>
  );
}

export default App;
