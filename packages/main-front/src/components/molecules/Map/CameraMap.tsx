import { LatLng } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface CameraMapProps {
  position: LatLng;
}

export const CameraMap = (props: CameraMapProps) => {
  const map = useMap();

  useEffect(() => {
    map.setView(props.position, 2);
  }, [props.position, map]);

  return null;
};
