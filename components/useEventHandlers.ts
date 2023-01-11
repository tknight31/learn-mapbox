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
    console.log(e.features?.[0], "feature object");
    console.log(`mouse entering ${e.features?.[0].id}`, currLayer);
  };

  const onMouseLeave = (e: mapboxgl.MapLayerMouseEvent) => {
    const currLayer = e.features?.[0].layer;
    console.log(`mouse leaving ${e.features?.[0].id}`, currLayer);
  };

  const onClick = (e: mapboxgl.MapLayerMouseEvent) => {
    // if features exist
    if (e.features && e.features?.length > 0) {
      // if the feature is already selected, deselect it
      if (selectedFeatureID !== null) {
        map?.setFeatureState(
          {
            source: "borough-data",
            sourceLayer: "Borough_Boundaries_Tiles",
            id: selectedFeatureID,
          },
          { selected: false }
        );
      }
      setSelectedFeatureID(e.features[0].id);
      map?.setFeatureState(
        {
          source: "borough-data",
          sourceLayer: "Borough_Boundaries_Tiles",
          id: e.features?.[0].id,
        },
        { selected: true }
      );
    }
  };

  return { onMouseEnter, onMouseLeave, onClick };
};

export default useEventHandlers;
