import "./textDivider.css";

import { CSSProperties } from "react";

interface TextDividerProps {
  text?: string;
  className?: string;
  style?: CSSProperties;
}

export function TextDivider({ text, className, style }: TextDividerProps) {
  return (
    <div
      className={`text-divider ${className ?? ""}`}
      style={style}
      data-testid="text-divider-wrapper"
    >
      <hr data-testid="text-divider-left" />
      {text && <span>{text}</span>}
      {text && <hr data-testid="text-divider-right" />}
    </div>
  );
}
