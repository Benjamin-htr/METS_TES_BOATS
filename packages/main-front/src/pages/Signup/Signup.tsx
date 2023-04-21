import { Card, CardBody, CardFooter, CardHeader, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { SignupForm } from "./SignupForm";

export const Signup = () => {
  return (
    <Flex height={"100%"} align={"center"} justify={"center"}>
      <Card align="center">
        <CardHeader>
          <Heading size="md"> Inscription</Heading>
        </CardHeader>
        <CardBody>
          <Text mb={6}>Veuillez remplir le formulaire suivant afin de vous inscrire sur notre plateforme</Text>
          <SignupForm />
        </CardBody>
        <CardFooter>
          <Text>
            Vous n'avez pas de compte ?{" "}
            <RouteLink to="/login">
              <Link>connectez vous</Link>
            </RouteLink>
          </Text>
        </CardFooter>
      </Card>
    </Flex>
  );
};
