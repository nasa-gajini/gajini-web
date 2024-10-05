"use client";

import { useState, useEffect, useRef } from "react";

import { LatLngBounds, Map as LeafletMap } from "leaflet";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import useRectangleInfo from "@/hooks/useRectangleInfo";

const egyptBounds = new LatLngBounds([22.0, 25.0], [31.7, 35.0]);

const ManagementPage = () => {
  const [egyptBorder, setEgyptBorder] = useState<GeoJSON.FeatureCollection>();

  const { rectangleInfo } = useRectangleInfo();

  console.log(rectangleInfo?.rectangleLayer);

  const mapRef = useRef<LeafletMap>(null);

  useEffect(() => {
    fetch("/assets/geojson/geoBoundaries-EGY-ADM0.geojson") // public/assets 경로의 GeoJSON 파일
      .then((response) => response.json())
      .then((data) => setEgyptBorder(data))
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  if (!egyptBorder) {
    return null;
  }

  return (
    <>
      <MapContainer
        ref={mapRef}
        center={[26.8206, 30.8025]} // 이집트의 중앙 좌표
        zoom={rectangleInfo?.zoom || 6.2}
        maxBounds={egyptBounds}
        maxBoundsViscosity={1.0}
        style={{ width: "50%", height: "100%" }}
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
      </MapContainer>
    </>
  );
};

export default ManagementPage;
