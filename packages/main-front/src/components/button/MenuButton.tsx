import { styled } from "@macaron-css/react";

export const MenuButton = styled("button", {
  base: {
    fontFamily: "Overwave",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    ":focus-visible": {
      outline: "4px auto -webkit-focus-ring-color",
    },
  },
});
