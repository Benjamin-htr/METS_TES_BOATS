import { style } from "@macaron-css/core";
import { LatLng, LatLngExpression } from "leaflet";
import { Fragment, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvent } from "react-leaflet";
import { boatMapIcon } from "./boatMapIcon";

const newTrajectStyle = style({
  height: "100%",
});

const mapStyle = style({
  selectors: {
    [`${newTrajectStyle} &`]: { height: "400px", width: "100%" },
  },
});

const LocationMarker = () => {
  const [position, setPosition] = useState<LatLng>(new LatLng(0, 0));

  useMapEvent("click", (e) => {
    setPosition(e.latlng);
    console.log(e.latlng);
  });

  if (position.equals(new LatLng(0, 0))) {
    return <Fragment />;
  }

  return <Marker position={position} />;
};

export const NewTraject = () => {
  const cameraPosition: LatLngExpression = [23, -173];
  const boatPosition: LatLngExpression = [23, -173];

  return (
    <div className={newTrajectStyle}>
      <MapContainer
        center={cameraPosition}
        zoom={2}
        className={mapStyle}
        keyboard={false}
        dragging={false}
        zoomControl={false}
        boxZoom={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        tap={false}
        touchZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={boatPosition} icon={boatMapIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <LocationMarker />
      </MapContainer>
    </div>
  );
};
