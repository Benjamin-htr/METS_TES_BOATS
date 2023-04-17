import { styled } from "@macaron-css/react";
import { Link, LinkProps } from "react-router-dom";

export const MyLink = styled((props: LinkProps) => <Link {...props} />, {
  base: {
    color: "black",
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
