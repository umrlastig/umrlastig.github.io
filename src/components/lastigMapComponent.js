import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const LastigMapContainer = () => {
  const coord = [48.841111, 2.587422];
  //const coord = [48.84473, 2.42413]; Saint-Mandé address
  // const coord = [48.84119, 2.58771];
  return (
    <MapContainer
      style={{ height: "400px" }}
      center={coord}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coord}>
        <Popup>
          That's us. <br /> The LASTIG Lab.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LastigMapContainer;
