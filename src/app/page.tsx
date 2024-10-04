"use client";

import { useState, useEffect } from "react";

import { LatLngBounds } from "leaflet";
import { MapContainer, FeatureGroup, TileLayer, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const egyptBounds = new LatLngBounds([22.0, 25.0], [31.7, 35.0]);

export default function Home() {
  const [egyptBorder, setEgyptBorder] = useState();

  useEffect(() => {
    fetch("/assets/geojson/geoBoundaries-EGY-ADM0.geojson") // public/assets 경로의 GeoJSON 파일
      .then((response) => response.json())
      .then((data) => setEgyptBorder(data))
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  return (
    <>
      <h4>Step 1. 농지 영역을 선택해주세요</h4>

      <MapContainer
        center={[26.8206, 30.8025]} // 이집트의 중앙 좌표
        zoom={6}
        minZoom={6}
        maxZoom={16}
        maxBounds={egyptBounds}
        maxBoundsViscosity={1.0}
        style={{ height: "80vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png"
        />

        {egyptBorder && (
          <GeoJSON
            data={egyptBorder}
            style={{ color: "black", weight: 2, fillOpacity: 0 }}
          />
        )}

        <FeatureGroup>
          <EditControl
            position="topright"
            draw={{
              polyline: false,
              polygon: false,
              circle: false,
              rectangle: true,
              marker: false,
              circlemarker: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </>
  );
}
