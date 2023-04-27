import { Flex } from "@chakra-ui/react";
import { MyBoatsCard } from "./MyBoatsCard";
import { ProfileCard } from "./ProfileCard";

export const DesktopProfile = () => {
  return (
    <Flex flexGrow={1} p={"20px"} gap={"10px"}>
      <ProfileCard flexShrink={0} />
      <MyBoatsCard flexGrow={1} />
    </Flex>
  );
};
