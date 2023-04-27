import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { forwardRef } from "react";

export const ProfileCard = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  return (
    <Card {...props} ref={ref}>
      <CardHeader>
        <Heading size="md">Profil</Heading>
        <Avatar size={"2xl"} mt={"auto"} mb={"auto"} />
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Summary
            </Heading>
            <Text pt="2" fontSize="sm">
              View a summary of all your clients over the last month.
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Overview
            </Heading>
            <Text pt="2" fontSize="sm">
              Check out the overview of your clients.
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Analysis
            </Heading>
            <Text pt="2" fontSize="sm">
              See a detailed analysis of all your business clients.
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
});
