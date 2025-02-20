import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const StaticLocationMap = ({ latitude, longitude }) => {
  const markerPosition = [latitude, longitude];

  const defaultIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -40],
    shadowSize: [41, 41],
  });

  return (
    <div>
      <span className="text-sm p-1 flex justify-center">
        Selected Location:{" "}
        <span className="text-blue-400">
          {latitude.toFixed(4)}, {longitude.toFixed(4)}
        </span>
      </span>
      <MapContainer
        center={markerPosition}
        zoom={17}
        style={{ height: "300px", width: "400px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={markerPosition} icon={defaultIcon}>
          <Popup>Selected Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default StaticLocationMap;
