"use client";

import { useState, useEffect, useRef } from "react";

import { LatLngBounds, Map } from "leaflet";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import useRectangleInfo from "@/hooks/useRectangleInfo";

import { DEFAULT_ZOOM, DEFAULT_CENTER } from "@/constants/map";

import { Button } from "@mui/material";
import ImageOverlay from "@/components/ImageOverlay";

const ManagementPage = () => {
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  const [egyptBorder, setEgyptBorder] = useState<GeoJSON.FeatureCollection>();

  const { rectangleInfo } = useRectangleInfo();

  const mapRef = useRef<Map>(null);

  useEffect(() => {
    fetch("/assets/geojson/geoBoundaries-EGY-ADM0.geojson") // public/assets 경로의 GeoJSON 파일
      .then((response) => response.json())
      .then((data) => setEgyptBorder(data))
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  if (!egyptBorder) {
    return null;
  }

  const imageUrl = "/assets/images/LST_Night_1km.png";
  const imageBounds = new LatLngBounds(
    [19.89504, 21.30469],
    [39.96725, 42.18066],
  );

  return (
    <>
      <MapContainer
        ref={mapRef}
        center={DEFAULT_CENTER} // 이집트의 중앙 좌표
        zoom={DEFAULT_ZOOM}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png"
        />

        {egyptBorder && (
          <GeoJSON
            data={egyptBorder}
            style={{ color: "green", weight: 2, fillOpacity: 0 }}
          />
        )}

        {overlayVisible && (
          <ImageOverlay imageUrl={imageUrl} bounds={imageBounds} />
        )}
      </MapContainer>

      <Button
        variant="contained"
        onClick={() => setOverlayVisible((prev) => !prev)}
        style={{
          position: "fixed",
          right: "10px",
          bottom: "10px",
          zIndex: 99999,
        }}
      >
        Toggle
      </Button>
    </>
  );
};

export default ManagementPage;
