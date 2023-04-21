import { Card, CardBody, CardHeader, Flex, Heading, Text } from "@chakra-ui/react";
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
      </Card>
    </Flex>
  );
};
