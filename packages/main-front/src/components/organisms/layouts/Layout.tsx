import { useMediaQuery } from "@chakra-ui/react";
import { DesktopLayout } from "./DesktopLayout";
import { MobileLayout } from "./MobileLayout";

export const Layout = () => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

  return <>{isLargerThan600 ? <DesktopLayout /> : <MobileLayout />}</>;
};
