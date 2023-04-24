import { IconButton, Input, InputGroup, InputProps, InputRightElement } from "@chakra-ui/react";
import { forwardRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input pr="3rem" type={show ? "text" : "password"} placeholder="mot de passe" {...props} ref={ref} />
      <InputRightElement width="3rem">
        <IconButton
          size="sm"
          onClick={handleClick}
          icon={show ? <AiFillEye /> : <AiFillEyeInvisible />}
          aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        />
      </InputRightElement>
    </InputGroup>
  );
});
