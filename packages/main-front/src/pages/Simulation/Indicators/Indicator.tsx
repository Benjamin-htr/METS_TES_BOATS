import { Box, BoxProps } from "@chakra-ui/react";
import { forwardRef } from "react";

export const Indicator = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return (
    <Box
      bg="black"
      border={"1px dashed rgba(255, 255, 255, 0.5)"}
      height={"70px"}
      width={"70px"}
      borderRadius={"100px"}
      as={"button"}
      ref={ref}
      {...props}
    >
      {props.children}
    </Box>
  );
});
