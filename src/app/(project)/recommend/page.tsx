"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Lottie from "react-lottie-player";

import useRectangleInfo from "@/hooks/useRectangleInfo";

import { convertLatLngBoundsToArray } from "@/utils/map";

import { CropType } from "@/constants/crop";
import { Route } from "@/constants/route";

import { Typography, Stack } from "@mui/material";
import ArrowButtons from "@/components/ArrowButtons";

import lottieJson from "../../../../public/assets/json/search.json";

const axios = require("axios");

export interface Params {
  p1: number[];
  p2: number[];
}

export interface RecommendDto {
  crop_type: number;
  description: string;
}

const RecommendPage = () => {
  const router = useRouter();

  const [recommendedCrop, setRecommendedCrop] = useState<RecommendDto>();

  const { rectangleInfo } = useRectangleInfo();

  useEffect(() => {
    if (!rectangleInfo?.rectangleLayer) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.post("/api/recommend", {
          ...convertLatLngBoundsToArray(
            rectangleInfo.rectangleLayer.getBounds(),
          ),
        });
        setRecommendedCrop(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [rectangleInfo?.rectangleLayer]);

  useEffect(() => {
    console.log("recommendedCrop", recommendedCrop);
  }, [recommendedCrop]);

  const clickPrev = () => {
    router.push(Route.Status);
  };

  const clickNext = () => {
    router.push(Route.Management);
  };

  return (
    <>
      <Typography variant="subtitle1" textAlign="center" p={2}>
        Step 3. Recommend crops for my farmland situation
      </Typography>

      <Stack flex={1} alignItems="center" justifyContent="center">
        {recommendedCrop ? (
          <>
            <Typography variant="h4" component="span">
              {`“${
                {
                  [CropType.Wheat]: "Wheat",
                  [CropType.Cotton]: "Cotton",
                  [CropType.Corn]: "Corn",
                  [CropType.Chickpeas]: "Chickpeas",
                  [CropType.Barley]: "Barley",
                  [CropType.DatePalms]: "Date palms",
                }[recommendedCrop.crop_type]
              }”`}
            </Typography>

            <Typography>{recommendedCrop.description}</Typography>
          </>
        ) : (
          <>
            <Lottie
              play
              loop
              animationData={lottieJson}
              style={{ width: "500px", height: "500px" }}
            />

            <Typography textAlign="center" whiteSpace="pre-line">
              We're analyzing. Please be patient.
            </Typography>
          </>
        )}
      </Stack>

      <ArrowButtons
        prevButtonProps={{ onClick: clickPrev }}
        nextText={recommendedCrop ? `SELECT ${recommendedCrop}` : "SELECT"}
        nextButtonProps={{ onClick: clickNext, disabled: !recommendedCrop }}
      />
    </>
  );
};

export default RecommendPage;
