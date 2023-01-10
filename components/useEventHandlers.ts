import { useAtom } from "jotai";
import mapboxgl from "mapbox-gl";
import { mapAtom, selectedFeatureIDAtom } from "@/lib/store";

const useEventHandlers = () => {
  const [map] = useAtom(mapAtom);
  const [selectedFeatureID, setSelectedFeatureID] = useAtom(
    selectedFeatureIDAtom
  );

  const onMouseEnter = (e: mapboxgl.MapLayerMouseEvent) => {
    const currLayer = e.features?.[0].layer;
    // console.log(currLayer?.paint?["fill-opacity"], "CURR LAYER");
    // currLayer?.paint?.["fill-opacity"]
    const layerId = String(e.features?.[0].layer.id);

    // console.log(`enter - ${layerId}`);
  };

  const onMouseLeave = (e: mapboxgl.MapLayerMouseEvent) => {
    const layerId = String(e.features?.[0].layer.id);

    // console.log(`leave - ${layerId}`);
  };

  const onClick = (e: mapboxgl.MapLayerMouseEvent) => {
    console.log(e.features?.[0].id, "Click EVENT");
    const layerId = String(e.features?.[0]?.layer.id);
    setSelectedFeatureID(e.features?.[0].id);
  };

  return { onMouseEnter, onMouseLeave, onClick };
};

export default useEventHandlers;
