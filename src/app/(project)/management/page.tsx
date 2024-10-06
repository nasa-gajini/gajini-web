"use client";

import { useState, useEffect, useRef, useMemo } from "react";

import { LatLng, Map, Marker } from "leaflet";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Rectangle,
  FeatureGroup,
  Marker as MarkerIcon,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import useRectangleInfo from "@/hooks/useRectangleInfo";

import usePostPointTable, { PointTableDto } from "@/apis/usePostPointTable";
import usePostOverlayImage from "@/apis/usePostOverlayImage";

import { convertLatLngBoundsToArray } from "@/utils/map";

import { SMAP_RADIO_OPRIONS, SMAPValue } from "@/constants/crop";
import { COMMON_BOX_SHADOW_SX } from "@/components/Chatbot/constants";

import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Chatbot from "@/components/Chatbot";
import ImageOverlay from "@/components/ImageOverlay";

const ManagementPage = () => {
  const [egyptBorder, setEgyptBorder] = useState<GeoJSON.FeatureCollection>();
  const [smapValue, setSMAPValue] = useState<SMAPValue>(SMAPValue.SoilMoisture);
  const [pointTableData, setPointTableData] = useState<PointTableDto>();
  const [markerPosition, setMarkerPosition] = useState<LatLng>();

  const mapRef = useRef<Map>(null);

  const { rectangleInfo } = useRectangleInfo();

  const { data: imageOverlayData } = usePostOverlayImage(
    {
      data_field: smapValue,
      is_range: false,
      ...convertLatLngBoundsToArray(rectangleInfo!.rectangleLayer.getBounds()),
    },
    !!rectangleInfo?.rectangleLayer,
  );
  const { mutate: postPointTable } = usePostPointTable();

  useEffect(() => {
    fetch("/assets/geojson/geoBoundaries-EGY-ADM0.geojson") // public/assets 경로의 GeoJSON 파일
      .then((response) => response.json())
      .then((data) => setEgyptBorder(data))
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  if (!egyptBorder || !rectangleInfo) {
    return null;
  }

  const { rectangleLayer, zoom } = rectangleInfo;
  const bounds = rectangleLayer.getBounds();

  // 마커 생성 핸들러
  const handleMarkerCreated = (e: any): void => {
    const layer = e.layer as Marker;

    // 경계 바깥의 마커면 제거
    if (bounds && !bounds.contains(layer.getLatLng())) {
      mapRef.current?.removeLayer(layer);
      alert("경계 안에서만 마커를 생성할 수 있습니다.");
      return;
    }

    setMarkerPosition(layer.getLatLng());
    postPointTable(
      {
        point: [layer.getLatLng().lat, layer.getLatLng().lng],
      },
      { onSuccess: (data) => setPointTableData(data) },
    );
  };

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

        {egyptBorder && (
          <GeoJSON
            data={egyptBorder}
            style={{ color: "green", weight: 2, fillOpacity: 0 }}
          />
        )}

        {imageOverlayData && (
          <ImageOverlay
            imageUrl={`data:image/png;base64,${imageOverlayData.data}`}
            bounds={bounds}
          />
        )}

        <Rectangle
          bounds={bounds}
          pathOptions={{ color: "red", weight: 2, fillOpacity: 0 }}
        />

        {markerPosition && <MarkerIcon position={markerPosition} />}

        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleMarkerCreated}
            draw={{
              polyline: false,
              polygon: false,
              circle: false,
              rectangle: false,
              marker: true,
              circlemarker: false,
            }}
            edit={{
              edit: false,
              remove: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>

      <Box
        p={1}
        sx={{
          width: "40%",
          height: "100%",
          borderLeft: 1,
          borderColor: "divider",
          overflow: "auto",
          position: "absolute",
          right: 0,
        }}
      >
        <Typography whiteSpace="pre-line" mb={2}>
          {markerPosition
            ? `Latitude: ${markerPosition?.lat}\nLongitude: ${markerPosition?.lng}`
            : ""}
        </Typography>

        {pointTableData &&
          Object.entries(pointTableData).map(([key, value]) => {
            return (
              <>
                <Typography variant="subtitle1" fontWeight="bold">
                  {key}
                </Typography>

                {value &&
                  Object.entries(value).map(([innerKey, innerValue]) => {
                    return (
                      <>
                        <Typography variant="body2">{`${innerKey}: ${innerValue}`}</Typography>
                      </>
                    );
                  })}
              </>
            );
          })}
      </Box>

      <RadioGroup
        row
        value={smapValue}
        onChange={(e) => setSMAPValue(e.target.value as SMAPValue)}
        sx={{
          ...COMMON_BOX_SHADOW_SX,
          width: "calc(60% - 100px)",
          bgcolor: "white",
          px: 1.5,
          py: 0.5,
          borderRadius: 3,
          position: "fixed",
          left: "50px",
          top: "10px",
          zIndex: 99999,
        }}
      >
        {SMAP_RADIO_OPRIONS.map((option) => (
          <FormControlLabel
            key={option.value}
            {...option}
            control={
              <Radio
                size="small"
                sx={{ p: 0.5, ".MuiButtonBase-root": { p: 0 } }}
              />
            }
            sx={{ height: 30, p: 0 }}
            slots={{ typography: "small" }}
          />
        ))}
      </RadioGroup>

      <Chatbot />
    </>
  );
};

export default ManagementPage;
