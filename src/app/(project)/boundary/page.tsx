"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import L, { LatLngBounds, Map as LeafletMap } from "leaflet";
import { MapContainer, FeatureGroup, TileLayer, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import useRectangleInfo from "@/hooks/useRectangleInfo";

import { Route } from "@/constants/route";

import { Typography } from "@mui/material";
import ArrowButtons from "@/components/ArrowButtons";

const egyptBounds = new LatLngBounds([22.0, 25.0], [31.7, 35.0]);

const BoundaryPage = () => {
  const router = useRouter();

  const [egyptBorder, setEgyptBorder] = useState<GeoJSON.FeatureCollection>();
  const [rectangleLayer, setRectangleLayer] = useState<L.Rectangle | null>(null);

  const { setRectangleInfo } = useRectangleInfo();

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
    if (!rectangleLayer) {
      return;
    }

    router.push(Route.Status);
    setRectangleInfo({ rectangleLayer, zoom: mapRef.current!.getZoom() });
  };

  if (!egyptBorder) {
    return null;
  }

  // GeoJSON 경계를 LatLngBounds로 변환
  const getBoundsFromGeoJSON = (geojson: GeoJSON.FeatureCollection) => {
    const layer = L.geoJSON(geojson);

    return layer.getBounds();
  };

  const handleDrawCreated = (e: any): void => {
    const layer = e.layer;
    const bounds = egyptBorder ? getBoundsFromGeoJSON(egyptBorder) : null;

    // 경계 바깥의 영역이면 제거
    if (bounds && !bounds.contains(layer.getBounds())) {
      mapRef.current?.removeLayer(layer);
      alert("경계 안에서만 도형을 그릴 수 있습니다.");
      return;
    }

    // 새 사각형을 지도에 추가하고 Ref 업데이트
    setRectangleLayer(layer);
    mapRef.current?.addLayer(layer);
  };

  const handleDrawDeleted = () => {
    setRectangleLayer(null);
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
          style={{ color: "green", weight: 2, fillOpacity: 0 }}
        />

        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleDrawCreated}
            onDeleted={handleDrawDeleted}
            draw={{
              polyline: false,
              polygon: false,
              circle: false,
              rectangle: !rectangleLayer,
              marker: false,
              circlemarker: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>

      <ArrowButtons
        prevButtonProps={{ onClick: clickPrev }}
        nextButtonProps={{
          onClick: clickNext,
          disabled: !rectangleLayer,
        }}
      />
    </>
  );
};

export default BoundaryPage;
