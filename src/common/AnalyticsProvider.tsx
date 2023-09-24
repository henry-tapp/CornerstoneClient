import { createContext, useContext, useEffect, useMemo } from "react";
import ReactGA from "react-ga4";
// import { GA4 } from "react-ga4/types/ga4";
import { useLocation } from "react-router-dom";
import loglevel from "util/log";

interface AnalyticsInstance {
  // ga: GA4; // Returning this defeats the purpose of abstracting away from GA4

  // Abstraction Functions
  analyticsLogin?: (method: string) => void;
  analyticsLogout?: () => void;
}

// Google Analytics
// When we have a proper company ID set it in `.env` however you can test
// with other trackers by setting the var in .env.local or .env.development.local
// NOTE: I tried moving the initialization INTO the context provider but had problems.
const TRACKING_ID = import.meta.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;
if (!TRACKING_ID) {
  loglevel.error("No Google Analytics tracking ID provided!");
} else {
  loglevel.debug("Setting up GA4 with Tracking ID: ", TRACKING_ID);
  ReactGA.initialize(TRACKING_ID, {
    // testMode: true,
    // gaOptions: {},
    // gtagOptions: {},
  });
}

const analyticsFuncs = {
  // ga: ReactGA,
  analyticsLogin: (method: string) =>
    ReactGA.event({ category: "login", action: "login", label: method }),
  analyticsLogout: () =>
    ReactGA.event({ category: "logout", action: "logout" }),
};

const AnalyticsContext = createContext<AnalyticsInstance>(undefined as any);

interface AnalyticsProviderProps {
  debugPageViews?: boolean;
}

export function AnalyticsProvider({
  debugPageViews,
  children,
}: React.PropsWithChildren<AnalyticsProviderProps>) {
  const location = useLocation();

  useEffect(() => {
    ReactGA.set({ page: location.pathname });
    ReactGA.send({ hitType: "pageview", page: location.pathname });

    if (debugPageViews) {
      loglevel.debug(
        `%cGA pageview%c ${location.pathname}`,
        "color:white; font-weight: 800; background-color: seagreen; padding: 0.1rem 0.2rem;",
        "color: inherit; font-weight: inherit; font-size: inherit;"
      );
    }
  }, [debugPageViews, location]);

  const instance = useMemo<AnalyticsInstance>(() => {
    // if (!ReactGA.isInitialized) {
    //   loglevel.warn("AnalyticsProvider used without GA being initialised!");
    //   return {};
    // }

    return analyticsFuncs;
  }, []);

  return (
    <AnalyticsContext.Provider value={instance}>
      {children}
    </AnalyticsContext.Provider>
  );
}

/**
 * Consolidate all the analytics calls we may want to make here
 * so that it's easier to mock, debug or even change the provider
 * (to something other than Google Analytics).
 */
export default function useAnalytics() {
  return useContext(AnalyticsContext);
}
