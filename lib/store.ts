import { atom } from "jotai";
import { MapRef } from "react-map-gl";

export const mapAtom = atom<MapRef | null>(null);
