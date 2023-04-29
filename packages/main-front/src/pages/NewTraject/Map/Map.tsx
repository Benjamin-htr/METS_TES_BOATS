import { Box } from "@chakra-ui/react";
import { LatLng, LeafletMouseEvent } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { CameraMap } from "./CameraMap";
import { DestinationMarker } from "./DestinationMarker";
import { boatMapIcon } from "./boatMapIcon";

interface MapProps {
  boatPosition: LatLng;
  cameraPosition: LatLng;
  allowedControl: boolean;
  onDestinationPositionChange: (e?: LeafletMouseEvent) => void;
}

export const Map = (props: MapProps) => {
  return (
    <Box
      flexGrow={1}
      as={MapContainer}
      center={props.cameraPosition}
      zoom={2}
      keyboard={props.allowedControl}
      dragging={props.allowedControl}
      zoomControl={false}
      boxZoom={props.allowedControl}
      doubleClickZoom={props.allowedControl}
      scrollWheelZoom={props.allowedControl}
      tap={props.allowedControl}
      touchZoom={props.allowedControl}
      attributionControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={props.boatPosition} icon={boatMapIcon} />
      <CameraMap position={props.boatPosition} />
      <DestinationMarker onClick={props.onDestinationPositionChange} />
    </Box>
  );
};
