import { LatLng, LeafletMouseEvent } from "leaflet";
import { Fragment, useState } from "react";
import { Marker, useMapEvent } from "react-leaflet";

interface DestinationMarkerProps {
  position?: LatLng;
  onClick?: (e?: LeafletMouseEvent) => void;
}

export const DestinationMarker = (props: DestinationMarkerProps) => {
  const defaultPosition = props.position ?? new LatLng(0, 0);
  const [position, setPosition] = useState<LatLng>(defaultPosition);

  useMapEvent("click", (e) => {
    if (props.onClick) {
      setPosition(e.latlng);
      props.onClick(e);
    }
  });

  if (!props.position && position.equals(defaultPosition)) {
    return <Fragment />;
  }

  return <Marker position={position} />;
};
