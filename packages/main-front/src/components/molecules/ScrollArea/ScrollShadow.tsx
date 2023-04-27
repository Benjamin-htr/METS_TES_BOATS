import { Box } from "@chakra-ui/react";

interface ScrollShadowProps {
  shadowColor: string;
  pos: "top" | "bottom";
}

export const ScrollShadow = (props: ScrollShadowProps) => {
  return (
    <Box
      display={"block"}
      position={"absolute"}
      top={props.pos === "top" ? 0 : undefined}
      bottom={props.pos === "bottom" ? 0 : undefined}
      left={0}
      height={"100px"}
      w={"100%"}
      zIndex={1}
      bgGradient={
        props.pos === "top"
          ? `linear(to-b, ${props.shadowColor}, rgba(255, 255, 255, 0))`
          : `linear(to-t, ${props.shadowColor}, rgba(255, 255, 255, 0))`
      }
    />
  );
};
