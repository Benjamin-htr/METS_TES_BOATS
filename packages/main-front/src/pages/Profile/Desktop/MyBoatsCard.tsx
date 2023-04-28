import { Card, CardBody, CardHeader, CardProps, Heading } from "@chakra-ui/react";
import { forwardRef } from "react";
import { ScrollArea } from "../../../components/molecules/ScrollArea/ScrollArea";
import { trpc } from "../../../lib/trpc";

export const MyBoatsCard = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const boatsQuery = trpc.boat.getAllBoats.useQuery();

  return (
    <Card {...props} ref={ref}>
      <CardHeader>
        <Heading size="md">Mes bateaux</Heading>
      </CardHeader>
      <CardBody>
        <ScrollArea>
          {boatsQuery.data?.map((boat) => (
            <div key={boat.id}>{boat.name}</div>
          ))}
        </ScrollArea>
      </CardBody>
    </Card>
  );
});
