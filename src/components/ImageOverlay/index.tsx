import { useEffect } from "react";

import { imageOverlay, LatLngBoundsExpression } from "leaflet";
import { useMap } from "react-leaflet";

const ImageOverlay = ({
  imageUrl,
  bounds,
}: {
  imageUrl: string;
  bounds: LatLngBoundsExpression;
}) => {
  const map = useMap(); // useMap 훅을 사용해 지도 객체 가져오기

  useEffect(() => {
    if (imageUrl && bounds) {
      const overlay = imageOverlay(imageUrl, bounds);
      overlay.addTo(map);

      // 컴포넌트가 언마운트될 때 오버레이 제거
      return () => {
        map.removeLayer(overlay);
      };
    }
  }, [imageUrl, bounds, map]);

  return null;
};

export default ImageOverlay;
