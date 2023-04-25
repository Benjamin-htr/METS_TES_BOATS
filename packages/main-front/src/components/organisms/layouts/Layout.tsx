import { useMediaQuery } from "@chakra-ui/react";
import { DesktopLayout } from "./DesktopLayout";
import { MobileLayout } from "./MobileLayout";

export const Layout = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return <div>{isLargerThan800 ? <DesktopLayout /> : <MobileLayout />}</div>;
};
