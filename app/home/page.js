"use client";

import React, { useState, useEffect } from "react";
import NodeCard from "@/components/sensorComponent/nodeCard";

const Home = () => {
  const [data, setData] = useState([]);
  const endpoint = "masukan endpoint disini"; // Replace with your actual endpoint

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

  console.log(data);

  return (
    <div className=" mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sensor Data</h1>
      {/* Tambahkan nama kalian disini */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Import Component dan masukan data kedalam component */}
      </div>
    </div>
  );
};

export default Home;
