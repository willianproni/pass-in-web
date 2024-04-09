import { Link, LinkProps } from "react-router-dom";

interface NavLinkProps extends LinkProps {
  children: string | JSX.Element;
}

export function NavLink(props: NavLinkProps) {
  return (
    <Link {...props} className="font-medium text-sm">
      {props.children}
    </Link>
  );
}
