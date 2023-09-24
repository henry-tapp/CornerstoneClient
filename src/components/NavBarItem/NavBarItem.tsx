import "./navBarItem.css";

import { LinkPersistQuery } from "components/LinkPersistQuery";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface NavBarItemProps {
  icon?: React.ReactNode;
  text: string;
  to: string;
}

export function NavBarItem({ to, text, icon }: NavBarItemProps) {
  return (
    <LinkPersistQuery pathname={to}>
      <div className="nav-bar-item">
        {icon}
        <span>{text}</span>
        <ChevronRightIcon />
      </div>
    </LinkPersistQuery>
  );
}
