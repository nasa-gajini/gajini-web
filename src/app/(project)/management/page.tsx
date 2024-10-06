"use client";

import { useState, useEffect, useRef } from "react";

import { Map } from "leaflet";
import { MapContainer, TileLayer, GeoJSON, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import useRectangleInfo from "@/hooks/useRectangleInfo";

import { Box } from "@mui/material";
import Chatbot from "@/components/Chatbot";

const ManagementPage = () => {
  const [egyptBorder, setEgyptBorder] = useState<GeoJSON.FeatureCollection>();

  const mapRef = useRef<Map>(null);

  const { rectangleInfo } = useRectangleInfo();

  useEffect(() => {
    fetch("/assets/geojson/geoBoundaries-EGY-ADM0.geojson") // public/assets 경로의 GeoJSON 파일
      .then((response) => response.json())
      .then((data) => setEgyptBorder(data))
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  if (!egyptBorder || !rectangleInfo) {
    return <Chatbot />;
  }

  const { rectangleLayer, zoom } = rectangleInfo;
  const bounds = rectangleLayer.getBounds();

  return (
    <>
      <MapContainer
        ref={mapRef}
        center={bounds.getCenter()}
        zoom={zoom}
        minZoom={zoom}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        style={{ width: "60%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png"
        />

        <Rectangle
          bounds={bounds}
          pathOptions={{ color: "red", weight: 2, fillOpacity: 0 }}
        />

        {egyptBorder && (
          <GeoJSON
            data={egyptBorder}
            style={{ color: "green", weight: 2, fillOpacity: 0 }}
          />
        )}
      </MapContainer>

      <Box
        sx={{
          width: "40%",
          height: "100%",
          overflow: "auto",
          position: "absolute",
          right: 0,
        }}
      >
        {/* TODO: 그래프 */}
      </Box>

      <Chatbot />
    </>
  );
};

export default ManagementPage;
