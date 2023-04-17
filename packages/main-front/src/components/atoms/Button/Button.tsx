import { styled } from "@macaron-css/react";

export const Button = styled("button", {
  base: {
    height: "fit-content",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    ":focus-visible": {
      outline: "4px auto -webkit-focus-ring-color",
    },
  },
});
