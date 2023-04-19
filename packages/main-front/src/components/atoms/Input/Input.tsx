import { InputHTMLAttributes } from "react";
import { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";

/*
export const Input = styled("input", {
  base: {
    border: "0",
    outline: "0",
    color: "rgb(60, 66, 87)",
    backgroundColor: "rgb(255, 255, 255)",
    boxShadow:
      "rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px",
    borderRadius: "4px",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "400",
    padding: "4px 8px",
    minHeight: "28px",
    verticalAlign: "middle",
    transition: "background-color .24s,box-shadow .24s",
    transitionProperty: "background-color, box-shadow",
    transitionDuration: "0.24s, 0.24s",
    transitionTimingFunction: "ease, ease",
    transitionDelay: "0s, 0s",
    ":focus": {
      boxShadow:
        "rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(58 151 212 / 36%) 0px 0px 0px 4px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px",
    },
  },
});
*/

interface InputProps<TFormValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<TFormValues>;

  register: UseFormRegister<TFormValues>;

  registerOptions?: RegisterOptions;
}

// const Input = (props: InputProps) => {
//   return <input {...props} />;
// };
