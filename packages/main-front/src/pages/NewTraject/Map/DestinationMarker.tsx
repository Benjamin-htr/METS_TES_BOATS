import { LatLng, LeafletMouseEvent } from "leaflet";
import { Fragment, useState } from "react";
import { Marker, useMapEvent } from "react-leaflet";

interface DestinationMarkerProps {
  onClick?: (e?: LeafletMouseEvent) => void;
}

export const DestinationMarker = (props: DestinationMarkerProps) => {
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
