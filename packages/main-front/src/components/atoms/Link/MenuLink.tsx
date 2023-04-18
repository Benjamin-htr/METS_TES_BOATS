import { styled } from "@macaron-css/react";
import { Link, LinkProps } from "react-router-dom";

export const MenuLink = styled((props: LinkProps) => <Link {...props} />, {
  base: {
    color: "black",
    fontSize: "2em",
    fontFamily: "Overwave",
    fontWeight: "bold",
    textDecoration: "none",
    height: "fit-content",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    ":focus-visible": {
      outline: "4px auto -webkit-focus-ring-color",
    },
    ":hover": {
      textDecoration: "underline",
    },
  },
});
