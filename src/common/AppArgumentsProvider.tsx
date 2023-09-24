import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useLocation } from "react-router-dom";
import {
  BooleanParam,
  NumberParam,
  StringParam,
  useQueryParam,
} from "use-query-params";
import loglevel from "util/log";

interface IAppArgumentsContext {
  rawQueryString: string;
  clientId?: string | null; // Optional override of the client id sent to the server
  inPark: boolean | null; // True = Yes, False = No, Null = unknown. e.g. ?inPark=1
  authToken?: string | null;
  style?: string | null; // Optional style/theme to dynamically load
  reservationsSpeed?: number | null; // Allows the app to override the speed of the reservation slider (if that's desired).
  reservationsVertical?: boolean | null; // Whether the reservations slider should scroll vertically instead of horizontally. e.g. ?reservationsVertical=1
  // By default the component will fill all available space but in-case we want to specify a specific dimension then use these 2 values (width and height)
  width?: string | number | null;
  height?: string | number | null;
  culture?: string | null;
  apiUrl?: string; // The Park code to lookup which API to use. Must map to a value in the config repo's config.js file.
  version?: boolean; // A debug value that if enabled will show the version that is deployed (Not currently implemented)
  darkMode: boolean;
}

const AppArgumentsContext = createContext<IAppArgumentsContext>(
  undefined as any
);

export function AppArgumentsProvider({ children }: PropsWithChildren) {
  const location = useLocation();
  const rawQueryString = useMemo(
    () => location.search ?? "",
    [location.search]
  );

  // TODO: Investigate if we can make these case-insensitive, does the use-query-params library have an option?

  const [clientId] = useQueryParam("clientId", StringParam);
  const [authToken] = useQueryParam("authToken", StringParam, {});
  const [style] = useQueryParam("style", StringParam); // Alternative to theme
  const [theme] = useQueryParam("theme", StringParam); // Alternative to style

  const [width] = useQueryParam("width", StringParam);
  const [height] = useQueryParam("height", StringParam);
  const [culture] = useQueryParam("culture", StringParam);
  const [apiCode] = useQueryParam("apiCode", StringParam);
  const [version] = useQueryParam("version", BooleanParam);
  const [darkMode] = useQueryParam("darkMode", BooleanParam);

  const apiUrl = useMemo<string | undefined>(() => {
    if (!apiCode) {
      loglevel.warn(
        "AppArgumentProvide: No apiCode found in query parameters, returning apiUrl = undefined."
      );
      return undefined;
    }
    const url =
      (window as any).globalrockdconfig?.apiMapping?.[apiCode] ?? undefined;
    if (url) {
      loglevel.info("Found mapped API url.", apiCode, url);
    } else {
      loglevel.warn(
        "Could not find a mapped API url.",
        apiCode,
        (window as any).globalrockdconfig?.apiMapping
      );
    }
    return url;
  }, [apiCode]);

  const appArgsInstance = useMemo(
    () => ({
      rawQueryString,
      clientId: clientId ?? null,
      authToken: authToken ?? null,
      style: style ?? theme ?? null,
      width: width ?? null,
      height: height ?? null,
      culture: culture ?? null,
      // Generated value
      apiUrl: apiUrl,
      version: version ?? false,
      darkMode: darkMode ?? false,
    }),
    [
      rawQueryString,
      clientId,
      apiUrl,
      authToken,
      culture,
      height,
      style,
      theme,
      version,
      width,
      darkMode,
    ]
  );

  useEffect(() => {
    loglevel.debug("AppArguments Config Update", appArgsInstance);
  }, [appArgsInstance]);

  return (
    <AppArgumentsContext.Provider value={appArgsInstance}>
      {version && (
        <div
          style={{
            position: "fixed",
            inset: "10%",
            borderRadius: "1em",
            boxShadow: "0 0 10px rgb(134, 184, 134)",
            backgroundColor: "white",
            // top: 0,
            // left: 0,
            // right: 0,
            // bottom: 0,
            padding: "1rem",
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
            fontSize: "0.7rem",
          }}
        >
          <span>
            <strong>Version:</strong>{" "}
            {import.meta.env.REACT_APP_DEPLOY_VERSION ?? "Unknown"}
          </span>
          <span>
            <strong>Deploy Time:</strong>
            {import.meta.env.REACT_APP_DEPLOY_TIME}
          </span>
        </div>
      )}
      {children}
    </AppArgumentsContext.Provider>
  );
}

export const AppArgumentsConsumer = AppArgumentsContext.Consumer;

export function useAppArguments() {
  return useContext(AppArgumentsContext);
}
