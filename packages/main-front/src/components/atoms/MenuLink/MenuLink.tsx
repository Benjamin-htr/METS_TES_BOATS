import { Link, LinkProps } from "react-router-dom";
import classes from "./menuLink.module.css";

interface MenuLinkProps extends LinkProps {
  children?: React.ReactNode;
}

export const MenuLink = (props: MenuLinkProps) => {
  return (
    <Link {...props} className={classes.MenuLink}>
      {props.children}
    </Link>
  );
};
