import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Helmet } from "react-helmet-async";
import log from "util/log";

interface IDynamicThemeContext {
  currentStyle?: string; // e.g. melw/lego
  currentStyleFilename?: string; // e.g. lego
  currentStyleUri?: string; // e.g. /theme/melw/lego.css
  currentStylePathUri?: string; // e.g. /theme/melw/
  isLoading: boolean;
}

const DynamicThemeContext = createContext<IDynamicThemeContext>(
  undefined as any
);

// Currently we need to ensure this is used (in App.tsx)
// and wrapped _within_ the query param provider so we
// can access the query params here. This isn't the nicest
// way and just passing in props maybe nicer.

// 10/08/2023 - CE - I'm currently in the middle of a big styling
//              refactor, and this has been modified as part of that
//              so that now we hide the site until the theme is loaded (or fails).
//              This is to prevent the site from loading with the wrong theme
//              and then changing to the correct one, which is a bad UX.
//              This DOESN'T use <Suspense /> currently, but it would be nice if we
//              could use it in the future.
export function DynamicThemeProvider({
  prefix,
  theme,
  darkMode,
  children,
  disableVersionSuffix,
}: React.PropsWithChildren<{
  prefix?: string;
  theme?: string | null;
  darkMode?: boolean | null;
  disableVersionSuffix?: boolean; // If true, don't add a version suffix to the CSS URL
}>) {
  if (darkMode == null) {
    darkMode = false;
  }

  const styleFilename = useMemo(() => {
    if (!theme) {
      return null;
    }

    const splitStyle = theme.split("/");
    if (splitStyle.length === 1) {
      return `default${darkMode ? "-dark" : ""}`;
    }

    return splitStyle[splitStyle.length - 1]; // Last elem
  }, [theme, darkMode]);

  const stylePath = useMemo(() => {
    if (!theme) {
      return null;
    }
    const splitStyle = theme.split("/");
    let path = theme;
    if (splitStyle.length === 1) {
      path = `${theme}/default`;
    }

    return `/${prefix ?? ""}${path}/` ?? null;
  }, [prefix, theme]);

  const stylesheetUri = useMemo(() => {
    if (!stylePath) {
      return null;
    }

    const suffix = disableVersionSuffix
      ? ""
      : `?v=${Math.floor(Math.random() * 999999)}`;

    return `${stylePath}${styleFilename}.css${suffix}` ?? null;
  }, [stylePath, disableVersionSuffix, styleFilename]);

  const [cssData, setCssData] = useState<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(!!stylesheetUri);

  const fetchTheme = useCallback(async (stylesheetUri: string) => {
    return await fetch(stylesheetUri)
      .then((res) => {
        return res.text();
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const stylesheetUriRef = useRef<string | null>(null);

  // TODO: Investigate why this gets run twice on a fresh load
  useEffect(() => {
    log.debug("Loading CSS Stylesheet", stylesheetUri);

    // If stylesheetUri is null (No theme specified) and
    // previously it WAS set then we need to clear the CSS
    // data so that the theme is removed.
    if (stylesheetUri === null && stylesheetUriRef.current !== null) {
      setCssData(null);
      setIsLoading(false);
    }

    // Is there a stylesheet URI and is it different to the last one?
    if (stylesheetUri !== null && stylesheetUriRef.current !== stylesheetUri) {
      fetchTheme(stylesheetUri).then((d) => {
        setCssData(d);
        setIsLoading(false);
      });
    }

    stylesheetUriRef.current = stylesheetUri;

    return () => {
      log.debug("Unloading CSS Stylesheet", stylesheetUri);
    };
  }, [fetchTheme, stylesheetUri]);

  const contextInstance = useMemo(
    () => ({
      currentStyle: theme ?? undefined,
      currentStyleFilename: styleFilename ?? undefined,
      currentStyleUri: stylesheetUri ?? undefined,
      currentStylePathUri: stylePath ?? undefined,
      isLoading: isLoading,
    }),
    [theme, styleFilename, stylesheetUri, stylePath, isLoading]
  );

  // Attach the onThemeLoaded callback to the window
  useEffect(() => {
    (window as any).onThemeLoaded = () => {
      setIsLoading(false);
      log.debug("Theme Loaded");
    };

    return () => {
      (window as any).onThemeLoaded = undefined;
    };
  }, []);

  return (
    <>
      <Helmet async={false} defer={false} encodeSpecialCharacters={false}>
        {/*
        We can't use (it seems) onLoad on <link> elements here, so we
        can't get a callback when the load is complete to un-suspense.
        As such I'm implementing a different technique using fetch instead of
        letting the browser load the stylesheet.
        We'll still get caching benefits in theory.
        */}
        {/* {stylesheetUri && (
          <link
            rel="stylesheet"
            type="text/css"
            href={stylesheetUri}
            // onLoad={"window.onThemeLoaded()" as any}
          />
        )} */}
        {cssData && <style>{cssData}</style>}
      </Helmet>
      <DynamicThemeContext.Provider value={contextInstance}>
        {/* {cssData && children} */}
        {/* {!isLoading && children} */}
        {isLoading ? <></> : children}
      </DynamicThemeContext.Provider>
    </>
  );
}

export const DynamicThemeConsumer = DynamicThemeContext.Consumer;

export function useDynamicTheme() {
  return useContext(DynamicThemeContext);
}
