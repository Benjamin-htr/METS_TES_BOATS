import { Box } from "@chakra-ui/react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { ScrollShadow } from "./ScrollShadow";

interface ScrollAreaProps {
  /**
   * Classe HTML :
   */
  className?: string;

  /**
   * Contenu
   */
  children?: React.ReactNode;
  /**
   * hauteur
   */
  maxHeight?: string;

  overflowX?: React.CSSProperties["overflowX"];

  innerRef?: React.Ref<HTMLDivElement>;

  shadowColor?: string;
}

export const ScrollArea = (props: ScrollAreaProps) => {
  const scrollableRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: scrollableRef,
  });
  const [topReached, setTopReached] = useState(true);
  const [bottomReached, setBottomReached] = useState(false);
  const shadowColor = props.shadowColor ? props.shadowColor : "rgba(255, 255, 255, 1)";

  useMotionValueEvent(scrollYProgress, "change", (test) => {
    if (test >= 0.99) {
      setBottomReached(true);
    }
    if (test <= 0.01) {
      setTopReached(true);
    }
    if (test > 0.01 && test < 0.99) {
      setTopReached(false);
      setBottomReached(false);
    }
  });

  return (
    <Box className={props.className} height={props.maxHeight ? props.maxHeight : "100%"} position={"relative"}>
      {!topReached && <ScrollShadow shadowColor={shadowColor} pos="top" />}
      <Box
        className={props.className}
        ref={scrollableRef}
        position={"absolute"}
        top={0}
        bottom={0}
        right={0}
        left={0}
        overflowX={props.overflowX ? props.overflowX : "hidden"}
      >
        {props.children}
      </Box>
      {!bottomReached && <ScrollShadow shadowColor={shadowColor} pos="bottom" />}
    </Box>
  );
};
