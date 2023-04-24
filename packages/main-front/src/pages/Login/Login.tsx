import { Card, CardBody, CardFooter, CardHeader, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { LoginForm } from "./LoginForm";

export const Login = () => {
  return (
    <Flex height={"100%"} align={"center"} justify={"center"}>
      <Card align="center">
        <CardHeader>
          <Heading size="md">Connexion</Heading>
        </CardHeader>
        <CardBody>
          <LoginForm />
        </CardBody>
        <CardFooter>
          <Text textAlign={"center"}>
            Vous n'avez pas de compte ?<br />
            <Link as={RouteLink} to="/signup" textDecor={"underline"}>
              inscrivez vous
            </Link>
          </Text>
        </CardFooter>
      </Card>
    </Flex>
  );
};
