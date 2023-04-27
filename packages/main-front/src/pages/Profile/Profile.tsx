import { useMediaQuery } from "@chakra-ui/react";
import { DesktopProfile } from "./Desktop/DekstopProfile";
import { MobileProfile } from "./Mobile/MobileProfile";

export const Profile = () => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

  if (isLargerThan600) {
    return <DesktopProfile />;
  }
  return <MobileProfile />;
};
