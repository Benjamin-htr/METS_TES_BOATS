import { useMediaQuery } from "@chakra-ui/react";
import { DesktopProfile } from "./DekstopProfile";
import { MobileProfile } from "./MobileProfile";

export const Profile = () => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

  if (isLargerThan600) {
    return <DesktopProfile />;
  }
  return <MobileProfile />;
};
