import { Card, CardBody, CardFooter, CardHeader, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { SignupForm } from "./SignupForm";

export const Signup = () => {
  return (
    <Flex height={"100%"} align={"center"} justify={"center"}>
      <Card align="center">
        <CardHeader>
          <Heading size="md">Inscription</Heading>
        </CardHeader>
        <CardBody>
          <SignupForm />
        </CardBody>
        <CardFooter>
          <Text textAlign={"center"}>
            Vous avez déjà un compte ?<br />
            <Link as={RouteLink} to="/login" textDecor={"underline"}>
              connectez vous
            </Link>
          </Text>
        </CardFooter>
      </Card>
    </Flex>
  );
};
