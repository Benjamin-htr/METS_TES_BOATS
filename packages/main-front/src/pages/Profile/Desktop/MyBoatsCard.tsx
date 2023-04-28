import { Card, CardBody, CardHeader, CardProps, Heading } from "@chakra-ui/react";
import { forwardRef } from "react";
import { ScrollArea } from "../../../components/molecules/ScrollArea/ScrollArea";
import { BoatsList } from "../BoatsList";

export const MyBoatsCard = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  return (
    <Card {...props} ref={ref}>
      <CardHeader>
        <Heading size="md">Mes bateaux</Heading>
      </CardHeader>
      <CardBody>
        <ScrollArea>
          <BoatsList />
        </ScrollArea>
      </CardBody>
    </Card>
  );
});
