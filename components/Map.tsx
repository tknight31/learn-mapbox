import React from "react";
import { useState } from "react";
import Head from "next/head";
import Map, {
  AttributionControl,
  Layer,
  Source,
  Marker,
  FillLayer,
} from "react-map-gl";
// import * as turf from "@turf/turf";
import * as parkData from "../src/data/sb-parks.json";
import * as subwayData from "../src/data/subway.json";
import { Controls } from "./Controls";
// import { Button } from "@chakra-ui/react";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidGtuaWdodDMxIiwiYSI6ImNsY2o4MmV4NDQ5aWIzcW1vNzdleHg2dXMifQ.Bb6nK9SLunI75I81QECNig";

const boroughLayer: FillLayer = {
  id: "boroughs",
  type: "fill",
  "source-layer": "Borough_Boundaries_Tiles",
  paint: {
    "fill-color": "#4E3FC8",
    "fill-opacity": 0.5,
  },
};

const Mapbox = () => {
  const [viewState, setViewState] = useState({
    longitude: -74.0122106,
    latitude: 40.7467898,
    zoom: 11,
    bearing: 24,
  });

  const [isSubways, setSubways] = useState(true);
  const [isParks, setParks] = useState(true);

  return (
    <Map
      {...viewState}
      style={{ width: "100%", height: "100vh" }}
      onMove={(e) => setViewState(e.viewState)}
      mapStyle="mapbox://styles/tknight31/clcjiq8c1003v15t7fseghgtk"
      mapboxAccessToken={MAPBOX_TOKEN}
      pitch={60}
      attributionControl={false}
    >
      <AttributionControl customAttribution="I MADE THIS" />

      <Controls
        isSubways={isSubways}
        setSubways={setSubways}
        isParks={isParks}
        setParks={setParks}
      />
      <Source
        id="borough-data"
        type="vector"
        url={`https://api.mapbox.com/v4/tknight31.clckukyla0bpp2eqgaeo5ytc8-5xghl.json?access_token=${MAPBOX_TOKEN}`}
      >
        <Layer {...boroughLayer} />
      </Source>

      {isParks &&
        parkData.features.map((park) => {
          return (
            <Marker
              key={park.properties.PARK_ID}
              longitude={park.geometry.coordinates[0]}
              latitude={park.geometry.coordinates[1]}
            >
              <div style={{ fontSize: "45px" }}>🛹</div>
            </Marker>
          );
        })}
      {isSubways &&
        subwayData.features.map((station) => {
          return (
            <Marker
              key={station.properties.objectid}
              longitude={station.geometry.coordinates[0]}
              latitude={station.geometry.coordinates[1]}
            >
              <div style={{ fontSize: "14px" }}>🚆</div>
            </Marker>
          );
        })}
    </Map>
  );
};

export default Mapbox;
