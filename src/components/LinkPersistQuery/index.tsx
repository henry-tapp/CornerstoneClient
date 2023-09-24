import "./linkPersistQuery.css";

import { Link, useLocation } from "react-router-dom";

/**
 * React Router seems to NOT handle persisting the query string on navigation
 * well or at-all and given that we depend HEAVILY on the query string to
 * drive this application we need to ensure it is persisted.
 * A work around I found online is to pass the search in the Link, this means
 * ALL Links on the site that internally link to a route will be REQUIRED to use
 * this component instead of the default Link component (from the react-router-dom library).
 */
export function LinkPersistQuery({
  pathname,
  activeOnEmpty,
  onClick,
  className,
  children,
}: React.PropsWithChildren<{
  pathname: string;
  className?: string;
  // If you want the .active class applied on an empty route
  // I.E. this link is for the index then set this to true
  activeOnEmpty?: boolean;
  onClick?: (() => void) | ((e: any) => void);
}>) {
  const { pathname: currentPathname, search } = useLocation();

  return (
    <Link
      to={{ pathname: pathname, search: search }}
      onClick={onClick}
      className={`link-persist-query ${
        currentPathname.includes(pathname) ||
        (currentPathname === "/" && activeOnEmpty)
          ? "active"
          : ""
      } ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}
