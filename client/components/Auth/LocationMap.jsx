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

const LocationMap = ({ onLocationChange }) => {
  const [markerPosition, setMarkerPosition] = useState([
    27.619307687254505, 85.53849470214936,
  ]);

  const defaultIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png", // CDN URL for marker icon
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png", // CDN URL for shadow
    iconSize: [25, 41], // Marker size
    iconAnchor: [12, 41], // Anchor point for the icon (centered properly)
    popupAnchor: [0, -40], // Adjusted popup position
    shadowSize: [41, 41],
  });

  // Handle the dragging of the marker
  const handleMarkerDrag = (e) => {
    const { lat, lng } = e.target.getLatLng();
    setMarkerPosition([lat, lng]);
    onLocationChange(`${lat},${lng}`);
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]);
        onLocationChange(`${lat},${lng}`);
      },
    });
    return null;
  };

  return (
    <div>
      <span className="text-sm p-1 flex justify-center">
        Selected Location:{" "}
        <span className="text-blue-400">
          {" "}
          {markerPosition[0].toFixed(4)}, {markerPosition[1].toFixed(4)}
        </span>
      </span>
      <MapContainer
        center={markerPosition}
        zoom={17} // Adjusted zoom level (increase for closer zoom)
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={markerPosition}
          icon={defaultIcon} // Apply the default icon
          draggable={true} // Enable dragging of the marker
          eventHandlers={{
            dragend: handleMarkerDrag, // Update position when dragging ends
          }}
        />
        <MapClickHandler />
      </MapContainer>
    </div>
  );
};

export default LocationMap;
