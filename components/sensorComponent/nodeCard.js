import React, { useState } from "react";
import Image from "next/image";
import icon from "/public/humICon.svg";
import { Card, CardContent } from "../ui/card";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

const NodeCard = (props) => {
  const [ledStatus, setLedStatus] = useState(props.ledStatus);

  const handleChangeLED = () => {
    setLedStatus(!ledStatus);
    setLedState({ led: ledStatus ? 0 : 1 });
    console.log("LED status changed to:", ledStatus ? 0 : 1);
  };

  const baseURL =
    "https://mygarden-1c375-default-rtdb.asia-southeast1.firebasedatabase.app";

  const setLedState = (value) => {
    console.log(value);

    fetch(`${baseURL}/${props.deviceName}/.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data sent to Firebase successfully!");
        } else {
          throw new Error("Error sending data to Firebase");
        }
      })
      .catch((error) => {
        console.error("Error sending data to Firebase:", error);
      });
  };

  return (
    <div>
      <Card className="w-full max-w-md mx-auto shadow-xl">
        <CardContent className="text-left space-y-2 py-6">
          <h2 className="text-xl font-semibold">
            Device Name : {props.deviceName}
          </h2>
          <p className="text-lg">
            🌡️ Temperature: <strong>{props.temperature}°C</strong>
          </p>
          <p className="text-lg">
            💧 Humidity: <strong>{props.humidity}%</strong>
          </p>
          <div className="flex items-center space-x-2">
            <Switch checked={ledStatus} onCheckedChange={handleChangeLED} />
            <Label>LED Switch</Label>
          </div>
          {/* <p className="text-sm text-muted-foreground">
            ⏰ Time: {new Date(latestData.timestamp).toLocaleString()}
          </p> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default NodeCard;
