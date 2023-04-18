import L from "leaflet";
import boatMarker from "../../assets/icons/boat_marker.svg";

export const boatMapIcon = new L.Icon({
  iconUrl: boatMarker,
  iconSize: [40, 40],
});
