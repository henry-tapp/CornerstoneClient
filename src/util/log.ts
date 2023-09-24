import * as loglevel from "loglevel";

// export function getLogger() {
//     var level = localStorage.getItem('loglevel:cerberus') || 'INFO'
//     var log = require("loglevel").getLogger("cerberus")
//     log.setLevel(level)
//     return log
// }

// TODO: The above is a reminder/example to add some log level persistence in localStorage

if (import.meta.env.DEV) {
  // loglevel.setLevel("trace");
  loglevel.setDefaultLevel("DEBUG");
} else {
  // loglevel.setLevel("error");
  loglevel.setDefaultLevel("ERROR");
}

(window as any).setLogLevel = (
  level: loglevel.LogLevelDesc,
  persist?: boolean
) => loglevel.setLevel(level, persist);

export default loglevel;

/**
 * If we use this loglevel logger across the app (rather than the default one from the loglevel package),
 * it means we have a bit more control over the default log level and ensuring it's persisted in local storage etc.
 * We also expose (directly on the window object) a setLogLevel call which we could use in the browser to
 * set the log level (since the default is usually ERROR or INFO and we often want DEBUG). In the browser
 * doing this is as simple as `window.setLogLevel("DEBUG")`
 */
