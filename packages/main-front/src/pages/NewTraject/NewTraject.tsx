import { Box, Text } from "@chakra-ui/react";
import { LatLng, LeafletMouseEvent } from "leaflet";
import { Fragment, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import { boatMapIcon } from "./boatMapIcon";
import classes from "./newTraject.module.css";

interface LocationMarkerProps {
  onClick?: (e?: LeafletMouseEvent) => void;
}

const LocationMarker = (props: LocationMarkerProps) => {
  const [position, setPosition] = useState<LatLng>(new LatLng(0, 0));

  useMapEvent("click", (e) => {
    setPosition(e.latlng);
    if (props.onClick) {
      props.onClick(e);
    }
  });

  if (position.equals(new LatLng(0, 0))) {
    return <Fragment />;
  }

  return <Marker position={position} />;
};

export const NewTraject = () => {
  const cameraPosition: LatLng = new LatLng(23, -173);
  const boatPosition: LatLng = new LatLng(23, -173);
  const [destinationPosition, setDestinationPositionState] = useState<LatLng | undefined>(undefined);

  return (
    <div className={classes.newTraject}>
      <Box minH={"300px"} height={"70%"} width={"100%"}>
        <MapContainer
          center={cameraPosition}
          zoom={2}
          className={classes.map}
          keyboard={false}
          dragging={false}
          zoomControl={false}
          boxZoom={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          tap={false}
          touchZoom={false}
          attributionControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={boatPosition} icon={boatMapIcon} />
          <LocationMarker
            onClick={(e) => {
              setDestinationPositionState(e?.latlng ?? new LatLng(0, 0));
            }}
          />
        </MapContainer>
      </Box>
      <Text>
        {destinationPosition
          ? `Destination: ${(boatPosition.distanceTo(destinationPosition) / 1000).toFixed(0)} kms`
          : "Clicquez sur la carte pour définir une destination"}
      </Text>
    </div>
  );
};
