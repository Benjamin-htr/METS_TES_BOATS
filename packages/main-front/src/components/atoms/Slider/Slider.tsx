import { Slider, SliderFilledTrack, SliderMark, SliderProps, SliderThumb, SliderTrack } from "@chakra-ui/react";
import { forwardRef } from "react";

const labelStyles = {
  mt: "2",

  fontSize: "sm",
};

export const SliderBasic = forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  return (
    <Slider {...props} ref={ref} colorScheme="teal">
      <SliderMark value={0} {...labelStyles}>
        0
      </SliderMark>
      {props.max && (
        <SliderMark value={props.max} {...labelStyles} right={0} whiteSpace={"nowrap"} left={"unset !important"}>
          {props.max}
        </SliderMark>
      )}
      {!(props.value === undefined) && (
        <SliderMark value={props.value} textAlign="center" bg="teal" color="white" mt="3" ml="-6" w="12">
          {props.value}
        </SliderMark>
      )}
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
});
