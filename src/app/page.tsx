"use client";

import { MapContainer, FeatureGroup, TileLayer } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const egyptBounds = new LatLngBounds([22.0, 25.0], [31.7, 35.0]);

export default function Home() {
  return (
    <>
      <h4>Step 1. 농지 영역을 선택해주세요</h4>

      <MapContainer
        center={[26.8206, 30.8025]} // 이집트의 중앙 좌표
        zoom={6}
        minZoom={5}
        maxZoom={10}
        maxBounds={egyptBounds}
        maxBoundsViscosity={1.0}
        style={{ height: "80vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png"
        />

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
