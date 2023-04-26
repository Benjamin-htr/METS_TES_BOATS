import { Card, CardBody, CardFooter, CardHeader, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import waveImage from "../../assets/Wave.svg";
import { SignupForm } from "./SignupForm";

export const Signup = () => {
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} backgroundImage={waveImage}>
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
