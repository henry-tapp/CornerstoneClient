import "./siteError.css";

import { useTranslation } from "react-i18next";

import WarningIcon from "@mui/icons-material/Warning";

interface SiteErrorProps {
  title?: string;
  message?: string;
  hideIcon?: boolean;
}

/**
 * A common "site" error component just to indicate an error occurred and maintain consistency.
 */
export function SiteError({ title, message, hideIcon }: SiteErrorProps) {
  const { t } = useTranslation();
  return (
    <div className="site-error">
      {!hideIcon && (
        <WarningIcon
          // size="3rem"
          // color="var(--error)"
          color="error"
        />
      )}
      <div>
        <h1>{title ?? t("error.something_wrong")}</h1>
        <p>{message ?? t("error.unknown")}</p>
      </div>
    </div>
  );
}
