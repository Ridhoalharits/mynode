"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Switch } from "@/components/ui/switch";
import NodeCard from "@/components/sensorComponent/nodeCard";

const Home = () => {
  const [data, setData] = useState([]);
  const endpoint =
    "https://mygarden-1c375-default-rtdb.asia-southeast1.firebasedatabase.app/.json";

  const fetchData = async () => {
    try {
      const response = await fetch(endpoint);
      const jsonData = await response.json();
      const hasil = Object.values(jsonData);
      setData(hasil);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // console.log(data);

  return (
    <div className=" mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sensor Data</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <NodeCard
            key={index}
            temperature={item.temperature}
            humidity={item.humidity}
            deviceName={item.deviceID}
            ledStatus={item.led === 1 ? true : false}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
