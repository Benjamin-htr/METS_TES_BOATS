import { Button, Card, CardBody, CardHeader, CardProps, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { forwardRef } from "react";
import { IoMdAdd } from "react-icons/io";
import { ScrollArea } from "../../../components/molecules/ScrollArea/ScrollArea";
import { BoatsList } from "../Shared/BoatList/BoatList";
import { NewBoatModal } from "../Shared/NewBoatModal";

export const MyBoatsCard = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card {...props} ref={ref}>
        <CardHeader>
          <Flex justifyContent={"space-between"}>
            <Heading size="md">Mes bateaux</Heading>
            <Button colorScheme="blue" leftIcon={<IoMdAdd fill="white" />} onClick={onOpen}>
              Ajouter
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <ScrollArea>
            <BoatsList />
          </ScrollArea>
        </CardBody>
      </Card>
      <NewBoatModal isOpen={isOpen} onClose={onClose} />
    </>
  );
});
