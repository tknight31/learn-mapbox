import React from "react";
import { Button, VStack } from "@chakra-ui/react";
import { useMap, GeolocateControl } from "react-map-gl";

export const Controls = ({ isSubways, setSubways, isParks, setParks }: any) => {
  const { current: map } = useMap();
  const handleNYClick = () => {
    map?.flyTo({ center: [-74, 40.7] });
  };
  const handleCAClick = () => {
    map?.flyTo({ center: [-75.7164, 45.4138] });
  };
  return (
    <VStack position="absolute" left="10px" top="50px" gap="1" align="start">
      <GeolocateControl
        position="top-left"
        style={{ position: "static" }}
        onGeolocate={() => console.log("I see you")}
      />
      <Button onClick={handleNYClick}>Back to NY</Button>
      <Button onClick={handleCAClick}>Back to CA</Button>
      <Button onClick={() => setSubways(!isSubways)}> Show Subway</Button>
      <Button onClick={() => setParks(!isParks)}> Show Skateparks</Button>
    </VStack>
  );
};
