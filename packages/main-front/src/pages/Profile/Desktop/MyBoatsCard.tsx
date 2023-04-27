import { Box, Card, CardBody, CardHeader, CardProps, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import { forwardRef } from "react";
import { ScrollArea } from "../../../components/molecules/ScrollArea/ScrollArea";

export const MyBoatsCard = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  return (
    <Card {...props} ref={ref}>
      <CardHeader>
        <Heading size="md">Mes bateaux</Heading>
      </CardHeader>
      <CardBody>
        <ScrollArea>
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
          <p>
            orem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in scelerisque lacus, at posuere orci.
            Suspendisse eget magna metus. Etiam mollis bibendum eros, vitae pulvinar tortor mollis non. Donec finibus
            vestibulum enim, non sagittis felis bibendum a. Donec at arcu sed ante fermentum placerat. Donec vel dictum
            magna. Aenean volutpat libero ac nibh ullamcorper, ut varius leo molestie. Aenean sit amet cursus neque.
            Nulla interdum faucibus odio, eu pharetra leo maximus vel. Duis luctus vestibulum lacus, ut malesuada libero
            elementum vitae. Nullam sagittis diam et cursus pretium. Aliquam nec augue aliquet diam dignissim mattis ut
            a mauris. Pellentesque malesuada tincidunt urna, a luctus magna elementum placerat. Quisque nec scelerisque
            augue. Nullam aliquam purus sem, a pharetra risus maximus a. Proin a dapibus risus. Morbi malesuada elit non
            eros venenatis porttitor. Nullam eros lacus, sollicitudin a fermentum non, ullamcorper sit amet odio. Donec
            sed libero ante. Phasellus dapibus, lectus a interdum tincidunt, justo felis posuere risus, ac tempus ante
            eros vel ante. Integer in lacus a elit suscipit imperdiet. Fusce et enim ullamcorper, sagittis diam at,
            scelerisque metus. Sed auctor sapien non fringilla mattis. Mauris at felis eget arcu tempor tempor ac nec
            nibh. Vivamus egestas cursus mi, sit amet laoreet est malesuada eget. Donec vel magna nec urna pellentesque
            eleifend in in est. Donec nisl lorem, interdum a augue sed, viverra sodales massa. Phasellus dignissim augue
            in consequat rhoncus. Vivamus ullamcorper sapien erat, a placerat velit condimentum nec. Morbi placerat enim
            ut mauris ultrices elementum. Donec maximus varius nulla in volutpat. Mauris congue volutpat justo, nec
            euismod elit pulvinar in. Curabitur ac placerat lorem, quis semper ipsum. Mauris non pharetra nulla. Donec
            sollicitudin tempor consequat. Praesent dolor odio, lobortis at nisl id, vehicula pulvinar tortor. Aenean
            laoreet convallis ante quis posuere. Suspendisse dolor diam, pharetra porta efficitur nec, rutrum eget diam.
            Fusce vitae blandit orci, sit amet volutpat augue. Sed sed lorem ac ipsum mattis malesuada. Nam gravida
            purus ut lacus faucibus porttitor tincidunt at erat. Proin non elit accumsan, consequat turpis et, gravida
            ante. Maecenas nec est non elit auctor blandit eget quis augue. Class aptent taciti sociosqu ad litora
            torquent per conubia nostra, per inceptos himenaeos. Nam maximus cursus odio. Nulla mattis vulputate lorem,
            varius lobortis nunc. Nam vulputate laoreet metus eget facilisis. Morbi lacinia pharetra nisi, vel interdum
            diam pretium non. Aliquam erat volutpat. Etiam sit amet vulputate risus, eget gravida dolor. Nulla aliquet
            leo eu justo finibus suscipit. Curabitur neque purus, mollis eu ex eu, tincidunt gravida justo. Curabitur
            mauris lorem, tristique sed justo a, fringilla molestie quam. Nunc neque odio, dignissim vitae luctus quis,
            aliquet vel diam. Morbi odio neque, iaculis at nunc non, faucibus dignissim justo. Pellentesque convallis
            malesuada luctus. Cras sagittis ornare magna non hendrerit. Quisque convallis fringilla mauris, sed sagittis
            nisl hendrerit quis. Vestibulum ullamcorper tincidunt arcu, eu porta nibh sodales vitae. Fusce fringilla
            tristique elit, facilisis scelerisque nibh fermentum eget. Proin vitae lorem porttitor, viverra ante ut,
            imperdiet nibh. Curabitur ligula lacus, dictum non risus ut, scelerisque feugiat libero. Nunc interdum
            finibus justo sed vehicula. Maecenas imperdiet vestibulum consectetur. Aenean dapibus scelerisque felis vel
            placerat. Aenean pellentesque leo in tortor ornare congue. Suspendisse potenti. Sed tempus augue porta
            mauris congue, sit amet ornare mauris volutpat. Duis diam mauris, tempus in molestie sit amet, vulputate non
            mi. Praesent vehicula dolor eros, a malesuada diam tempor consectetur. Ut bibendum lectus et arcu pharetra,
            at auctor sem semper. Etiam varius, nulla at congue posuere, enim mi condimentum dui, id congue diam arcu ut
            justo. Vestibulum ac ipsum ut sem posuere pulvinar. Donec vel orci odio. Nam aliquet faucibus ligula in
            congue. In id venenatis lorem. Sed at iaculis sem. Phasellus suscipit ac lorem eget hendrerit. Ut ipsum
            odio, lobortis vel justo vitae, lacinia sodales nisi. Phasellus magna ex, viverra at malesuada et, imperdiet
            quis nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec urna sapien, tempus nec massa
            a, condimentum dapibus augue. Morbi vehicula mi in quam gravida feugiat. Donec et est commodo, viverra dolor
            eget, placerat massa. Curabitur magna metus, feugiat a sollicitudin quis, accumsan sed lectus. Morbi
            bibendum porta purus. Sed quis erat at justo finibus lacinia luctus et nibh. Mauris nec sapien arcu.
            Suspendisse vel blandit lacus, et viverra eros. Class aptent taciti sociosqu ad litora torquent per conubia
            nostra, per inceptos himenaeos. Pellentesque habitant morbi tristique senectus et netus et malesuada fames
            ac turpis egestas. Phasellus magna tellus, faucibus tempor ullamcorper quis, rutrum a arcu. Proin posuere,
            massa vitae tempor condimentum, mi felis scelerisque arcu, eget iaculis felis eros egestas sapien. Nulla
            mattis auctor scelerisque. Praesent interdum viverra nisi id tristique. Quisque sagittis euismod ante ut
            bibendum. Suspendisse potenti. Duis malesuada erat eget diam aliquet bibendum. Aliquam pellentesque enim id
            elit venenatis interdum. Nullam consequat turpis a dignissim consectetur. Sed gravida velit risus, quis
            interdum augue faucibus ac. Morbi sodales libero sed tortor mattis, nec euismod dui congue. Vivamus mi
            risus, convallis eu congue nec, aliquam at turpis. Mauris commodo ligula sit amet hendrerit maximus. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Donec vel felis viverra, convallis lorem vitae, finibus
            risus. Nam et suscipit urna, a scelerisque purus. Aliquam feugiat, libero ac euismod venenatis, erat purus
            finibus nulla, auctor convallis felis turpis sed urna. Pellentesque ultricies lectus mollis lorem elementum
            iaculis. Pellentesque eget mollis justo. Sed fringilla molestie scelerisque. Integer justo nisi, commodo ac
            ante non, lobortis vestibulum tellus. Fusce neque metus, dignissim dapibus faucibus interdum, finibus at
            purus. Fusce ut auctor sem. Duis in varius diam. Nam hendrerit mauris vitae sodales blandit. Mauris
            consectetur odio ac risus posuere dignissim. Duis et tempor quam, sit amet malesuada velit. Vivamus ac
            euismod turpis. Maecenas finibus, dolor in bibendum hendrerit, augue urna placerat massa, ut convallis felis
            ante vel leo. Mauris semper luctus elit, a commodo neque facilisis sit amet. Suspendisse quis pellentesque
            diam. Sed nec turpis sit amet leo faucibus dictum et non diam. Aenean blandit risus dictum dui elementum
            vestibulum. Nullam quis justo justo. Nam lobortis blandit metus. Aliquam consectetur elementum erat rhoncus
            semper. Fusce ac urna hendrerit, lobortis ligula placerat, interdum tellus. Morbi vel arcu sed mi viverra
            rhoncus nec et mi. Nulla facilisi. Suspendisse odio sem, pretium at eleifend a, luctus quis tortor.
            Curabitur tristique nec elit vel pulvinar. Phasellus felis mi, hendrerit vel leo at, bibendum mattis diam.
            Praesent porttitor, tortor nec tempus ullamcorper, ante mauris vulputate tellus, vel convallis orci nunc at
            enim. Suspendisse blandit ante orci, eu pretium risus faucibus scelerisque. Donec finibus augue a nisi
            pretium facilisis. Cras congue massa vel felis rhoncus ultrices. Nullam tristique pellentesque gravida.
            Nullam pulvinar ligula quis faucibus laoreet. Ut ut turpis gravida, facilisis quam eu, laoreet lacus. In nec
            efficitur massa. Maecenas ultrices efficitur quam. Integer hendrerit imperdiet massa, in dignissim metus
            lobortis quis. Praesent aliquet varius posuere. Duis non urna ut mauris blandit laoreet vel sit amet massa.
            Aenean sed elit eu velit efficitur placerat non sit amet dolor. Pellentesque congue tristique felis, vel
            pellentesque ex pharetra non. Pellentesque a malesuada nunc. Suspendisse interdum consequat lacus. Etiam
            nulla lectus, tempus semper fermentum vel, porttitor eget turpis. Donec in quam sed orci lacinia dictum.
            Mauris at congue tellus, pretium egestas dolor. Nam id commodo tellus, a consectetur tortor. Fusce volutpat
            nulla non elit volutpat pellentesque. Ut enim purus, feugiat at molestie eget, eleifend nec neque. Integer
            consequat nibh justo, nec consequat nulla sagittis quis. Donec ultrices odio at metus pellentesque lacinia.
            Donec justo ex, placerat ut ultricies vel, ornare et augue. Donec pellentesque erat et purus interdum, eget
            sodales massa faucibus. Quisque eget tellus suscipit, posuere enim eget, hendrerit nisi. Curabitur dolor ex,
            facilisis nec suscipit at, suscipit sit amet enim.
          </p>
        </ScrollArea>
      </CardBody>
    </Card>
  );
});
