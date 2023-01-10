import React, { useState } from "react";
import { useAtom } from "jotai";
import Mapbox, { AttributionControl, ViewState } from "react-map-gl";
import useEventHandlers from "./useEventHandlers";
import { mapAtom } from "@/lib/store";

type PropsType = {
  initialViewState?: Partial<ViewState>;
  children?: React.ReactNode;
};

const Map = (props: PropsType) => {
  const [, setMap] = useAtom(mapAtom);
  const eventHandlers = useEventHandlers();
  const [viewState, setViewState] = useState(props.initialViewState);

  return (
    <Mapbox
      {...eventHandlers}
      {...viewState}
      id="main-map"
      ref={(ref) => setMap(ref)}
      style={{ width: "100%", height: "100vh" }}
      onMove={(e) => setViewState(e.viewState)}
      mapStyle="mapbox://styles/tknight31/clcjiq8c1003v15t7fseghgtk"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      pitch={60}
      attributionControl={false}
      interactiveLayerIds={["boroughs"]}
    >
      <AttributionControl customAttribution="Tyler Knight" />
      {props.children}
    </Mapbox>
  );
};

export default Map;
