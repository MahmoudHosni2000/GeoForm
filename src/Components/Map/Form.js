import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { Button, Drawer, Input, Typography } from "@material-tailwind/react";

export default function Form({ data, drawerOpen, setDrawerOpen }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/map/list");
  };

  const [clickedData, setClickedData] = useState({
    city: "City not available",
    country: "Country not available",
    state: "State not available",
    lat: "Loading...",
    lon: "Loading...",
  });

  useEffect(() => {
    if (data.address) {
      setClickedData({
        city: data.address.city || "City not available",
        country: data.address.country || "Country not available",
        state: data.address.state || "State not available",
        lat: data.lat || "Loading...",
        lon: data.lon || "Loading...",
      });
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", clickedData);

    try {
      const docRef = await addDoc(collection(db, "clickedData"), clickedData);
      console.log("Document written with ID: ", docRef.id);
      setDrawerOpen(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClickedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Drawer
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      placement="right" // Position the drawer on the right
      className="!w-80"
    >
      <div className="flex flex-col gap-4 p-4 w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Typography variant="h6" color="blue-gray">
              City:
            </Typography>
            <Input
              id="city"
              name="city"
              size="lg"
              placeholder="City"
              value={clickedData.city}
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              Country:
            </Typography>
            <Input
              type="text"
              id="country"
              name="country"
              value={clickedData.country}
              placeholder="Enter Country"
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              State:
            </Typography>
            <Input
              type="text"
              id="state"
              name="state"
              value={clickedData.state}
              placeholder="Enter State"
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <ul className="list-disc pl-5">
            <li>Lat: {clickedData.lat}</li>
            <li>Long: {clickedData.lon}</li>
          </ul>
          <Button type="submit" className="mt-4" fullWidth>
            Submit
          </Button>
        </form>
        <Button onClick={handleNavigate} className="mt-4" fullWidth>
          Show List
        </Button>
      </div>
    </Drawer>
  );
}
