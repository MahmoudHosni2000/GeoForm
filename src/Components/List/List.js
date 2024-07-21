import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the import path as needed
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["City", "Country", "State", "Latitude", "Longitude", ""];

export default function List() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "clickedData"));
        const dataList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(dataList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleShowClick = (lat, lon) => {
    const url = `/location?&lat=${lat}&lon=${lon}`;
    window.open(url, '_blank');
  };

  return (
    <Card className="h-screen w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, city, country, state, lat, lon }, index) => {
            const isLast = index === data.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            
            return (
              <tr key={id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {city}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {country}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {state}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {lat}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {lon}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography
                    as="a"
                    onClick={() => handleShowClick(lat, lon)}
                    variant="small"
                    color="blue-gray"
                    className="font-medium cursor-pointer"
                  >
                    Show
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
