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
  StringParam,
  useQueryParam,
} from "use-query-params";
import loglevel from "util/log";

interface IAppArgumentsContext {
  rawQueryString: string;
  authToken?: string | null;
  style?: string | null;
  width?: string | number | null;
  height?: string | number | null;
  culture?: string | null;
  apiUrl?: string;
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

  const [authToken] = useQueryParam("authToken", StringParam, {});
  const [style] = useQueryParam("style", StringParam);
  const [theme] = useQueryParam("theme", StringParam);
  const [width] = useQueryParam("width", StringParam);
  const [height] = useQueryParam("height", StringParam);
  const [culture] = useQueryParam("culture", StringParam);
  const [apiCode] = useQueryParam("apiCode", StringParam);

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
      authToken: authToken ?? null,
      style: style ?? theme ?? null,
      width: width ?? null,
      height: height ?? null,
      culture: culture ?? null,
      apiUrl: apiUrl,
    }),
    [
      rawQueryString,
      apiUrl,
      authToken,
      culture,
      height,
      style,
      theme,
      width,
    ]
  );

  useEffect(() => {
    loglevel.debug("AppArguments Config Update", appArgsInstance);
  }, [appArgsInstance]);

  return (
    <AppArgumentsContext.Provider value={appArgsInstance}>
      {children}
    </AppArgumentsContext.Provider>
  );
}

export const AppArgumentsConsumer = AppArgumentsContext.Consumer;

export function useAppArguments() {
  return useContext(AppArgumentsContext);
}
