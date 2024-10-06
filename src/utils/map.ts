import { LatLngBounds } from "leaflet";

export const convertLatLngBoundsToArray = (
  bounds: LatLngBounds,
): {
  p1: number[];
  p2: number[];
} => {
  const southWest = bounds.getSouthWest(); // 남서 좌표
  const northEast = bounds.getNorthEast(); // 북동 좌표

  // 배열 형식으로 변환 [latitude, longitude]
  return {
    p1: [southWest.lat, southWest.lng],
    p2: [northEast.lat, northEast.lng],
  };
};
