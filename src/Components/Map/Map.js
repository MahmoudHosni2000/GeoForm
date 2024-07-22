import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Form from "./Form";
import { Button } from "@material-tailwind/react"; // Import Button here

const Map = () => {
  const [data, setData] = useState({});
  const [map, setMap] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // Add state for drawer

  useEffect(() => {
    const initialMap = L.map("map").setView([37.7749, -122.4194], 13);
    const tileLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(initialMap);

    setMap(initialMap);

    initialMap.on("click", (e) => {
      const { lat, lng } = e.latlng;
      fetchLocationDetails(lat, lng);
    });

    return () => {
      initialMap.off("click");
      initialMap.remove();
    };
  }, []);

  useEffect(() => {
    if (map && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 13);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [map]);

  const fetchLocationDetails = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      setData(await response.json());
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <Button onClick={() => setDrawerOpen(true)} className="custom-button">
        Open Form
      </Button>
      <div id="map" style={{ width: "100%", height: "100%" }} />
      <Form data={data} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </div>
  );
};

export default Map;
