import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import loglevel from "util/log";

export function useApiMocking() {
  const { search } = useLocation();

  useEffect(() => {
    const enableProdMocking =
      (import.meta.env.REACT_APP_ENABLE_PROD_MOCKING ?? "")?.toLowerCase() ===
      "true";
    // This following line DOES NOT WORK NOW! window.location.search is empty even with query params due to new routing
    const queryParams = new URLSearchParams(search);
    const queryIsApiMock = queryParams.get("apiCode") === "mock";
    const enableMocking =
      (queryIsApiMock && import.meta.env.DEV) ||
      (!import.meta.env.DEV &&
        enableProdMocking &&
        queryIsApiMock);
    loglevel.info(
      `%cEnable Mocking? ${enableMocking ? "%cYES" : "%cNO"}:`,
      `color: orangered; font-weight: bold;`,
      !enableMocking
        ? "color: green; font-weight: bold;"
        : "color: orangered; font-weight: bold;",
      queryParams,
      "import.meta.env.MODE = ",
      import.meta.env.MODE,
      "enableProdMocking = ",
      enableProdMocking
    );

    (window as any).apiCode = queryParams.get("apiCode") ?? "";
    (window as any).apiUrl =
      (window as any).globalrockdconfig?.apiMapping?.[
      (window as any).apiCode
      ] ?? undefined;

    if (enableMocking) {
      const { worker } = require("mocks/browser");

      // I've added this so we can conditionally enable this based on a query arg
      // rather than mocking ALWAYS being enabled in dev mode.
      worker.start();

      // Write the stop (and start) method on the window
      // to access during runtime.
      (window as any).__mswStart = worker.start;
      (window as any).__mswStop = worker.stop;
    }

    return () => {
      loglevel.info("useApiMocking: Cleaning up - Stopping worker");
      const { worker } = require("mocks/browser");
      worker.stop();
    };
    // We intentionally don't supply dependency props here so this
    // just runs once on creation! I.E. the comment below prevents the warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
