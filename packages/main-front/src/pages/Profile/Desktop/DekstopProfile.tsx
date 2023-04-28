import { Flex } from "@chakra-ui/react";
import { MyBoatsCard } from "./MyBoatsCard";
import { ProfileCard } from "./ProfileCard";

export const DesktopProfile = () => {
  return (
    <Flex flexGrow={1} p={"20px"} gap={"10px"}>
      <ProfileCard />
      <MyBoatsCard flexGrow={1} flexBasis={"350px"} />
    </Flex>
  );
};
