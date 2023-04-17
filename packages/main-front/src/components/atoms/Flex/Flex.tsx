import { styled } from "@macaron-css/react";

export const Flex = styled("div", {
  base: { display: "flex" },
  variants: {
    wrap: {
      wrap: {
        flexWrap: "wrap",
      },
      "no-wrap": {
        flexWrap: "nowrap",
      },
      "wrap-reverse": {
        flexWrap: "wrap-reverse",
      },
    },
    direction: {
      row: {
        flexDirection: "row",
      },
      column: {
        flexDirection: "column",
      },
      "row-reverse": {
        flexDirection: "row-reverse",
      },
      "column-reverse": {
        flexDirection: "column-reverse",
      },
    },
    justify: {
      start: {
        justifyContent: "flex-start",
      },
      center: {
        justifyContent: "center",
      },
      end: {
        justifyContent: "flex-end",
      },
      stretch: {
        justifyContent: "stretch",
      },
      "space-between": {
        justifyContent: "space-between",
      },
    },
    align: {
      start: {
        alignItems: "flex-start",
      },
      center: {
        alignItems: "center",
      },
      end: {
        alignItems: "flex-end",
      },
      stretch: {
        alignItems: "stretch",
      },
    },
    gap: {
      none: {
        gap: 0,
      },
      sm: {
        gap: "4px",
      },
      md: {
        gap: "8px",
      },
      lg: {
        gap: "16px",
      },
    },
  },
});
