import { useMediaQuery } from "@chakra-ui/react";
import { DesktopLayout } from "./DesktopLayout";
import { MobileLayout } from "./MobileLayout";

export const Layout = () => {
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

  return <>{isLargerThan700 ? <DesktopLayout /> : <MobileLayout />}</>;
};
