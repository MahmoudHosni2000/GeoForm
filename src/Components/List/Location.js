import React from "react";
import { useLocation } from "react-router-dom";
import { Typography, Card } from "@material-tailwind/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Ensure Leaflet's default icon is set correctly
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function Location() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const city = query.get("city");
  const country = query.get("country");
  const state = query.get("state");
  const lat = parseFloat(query.get("lat"));
  const lon = parseFloat(query.get("lon"));

  // Check if lat and lon are valid numbers
  const isValidLocation = !isNaN(lat) && !isNaN(lon);

  return (
    <Card className="p-4">
      <div className="h-96 mt-4">
        {isValidLocation ? (
          <MapContainer
            center={[lat, lon]}
            zoom={20}
            style={{ height: "100vh", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[lat, lon]}>
              <Popup>
                {city}, {country}, {state}
                <br />
                Latitude: {lat}
                <br />
                Longitude: {lon}
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <Typography variant="h1" color="red" className="text-center">
            Invalid location data. Please ensure latitude and longitude are correct.
          </Typography>
        )}
      </div>
    </Card>
  );
}
