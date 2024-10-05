"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import L, { LatLngBounds, Map as LeafletMap } from "leaflet";
import { MapContainer, FeatureGroup, TileLayer, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import { Route } from "@/constants/route";

import { Typography } from "@mui/material";
import ArrowButtons from "@/components/ArrowButtons";

const egyptBounds = new LatLngBounds([22.0, 25.0], [31.7, 35.0]);

export default function BoundaryPage() {
  const router = useRouter();

  const [egyptBorder, setEgyptBorder] = useState<GeoJSON.FeatureCollection>();

  const mapRef = useRef<LeafletMap>(null);

  useEffect(() => {
    fetch("/assets/geojson/geoBoundaries-EGY-ADM0.geojson") // public/assets 경로의 GeoJSON 파일
      .then((response) => response.json())
      .then((data) => setEgyptBorder(data))
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  const clickPrev = () => {
    router.push(Route.Home);
  };

  const clickNext = () => {
    router.push(Route.Status);
  };

  if (!egyptBorder) {
    return null;
  }

  // GeoJSON 경계를 LatLngBounds로 변환
  const getBoundsFromGeoJSON = (geojson: GeoJSON.FeatureCollection) => {
    const layer = L.geoJSON(geojson);

    return layer.getBounds();
  };

  const handleDrawCreated = (e): void => {
    const layer = e.layer;
    const bounds = egyptBorder ? getBoundsFromGeoJSON(egyptBorder) : null;

    console.log("egyptBorder", egyptBorder, "bounds", bounds);

    if (bounds && !bounds.contains(layer.getBounds())) {
      mapRef.current?.removeLayer(layer);
      alert("경계 안에서만 도형을 그릴 수 있습니다.");
    }
  };

  return (
    <>
      <Typography variant="subtitle1" textAlign="center" p={2}>
        Step 1. 농지 영역을 선택해주세요
      </Typography>

      <MapContainer
        ref={mapRef}
        center={[26.8206, 30.8025]} // 이집트의 중앙 좌표
        zoom={6.2}
        minZoom={6.2}
        maxZoom={16}
        maxBounds={egyptBounds}
        maxBoundsViscosity={1.0}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png"
        />

        <GeoJSON
          data={egyptBorder}
          style={{ color: "black", weight: 2, fillOpacity: 0 }}
        />

        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleDrawCreated}
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

      <ArrowButtons
        prevButtonProps={{ onClick: clickPrev }}
        nextButtonProps={{ onClick: clickNext }}
      />
    </>
  );
}
