"use client";

import { useRouter } from "next/navigation";

import Lottie from "react-lottie-player";

import useRectangleInfo from "@/hooks/useRectangleInfo";

import usePostRecommend from "@/apis/usePostRecommend";

import { convertLatLngBoundsToArray } from "@/utils/map";

import { CropType } from "@/constants/crop";
import { Route } from "@/constants/route";

import { Typography, Stack } from "@mui/material";
import ArrowButtons from "@/components/ArrowButtons";

import lottieJson from "../../../../public/assets/json/search.json";

const RecommendPage = () => {
  const router = useRouter();

  const { rectangleInfo } = useRectangleInfo();

  const { data: recommend } = usePostRecommend(
    {
      ...convertLatLngBoundsToArray(rectangleInfo!.rectangleLayer.getBounds()),
    },
    !!rectangleInfo?.rectangleLayer,
  );

  const clickPrev = () => {
    router.push(Route.Status);
  };

  const clickNext = () => {
    router.push(Route.Management);
  };

  const getCropName = () =>
    ({
      [CropType.Wheat]: "Wheat",
      [CropType.Cotton]: "Cotton",
      [CropType.Corn]: "Corn",
      [CropType.Chickpeas]: "Chickpeas",
      [CropType.Barley]: "Barley",
      [CropType.DatePalms]: "Date palms",
    }[recommend?.crop_type || CropType.Wheat]);

  return (
    <>
      <Typography variant="subtitle1" textAlign="center" p={2}>
        Step 3. Recommend crops for my farmland situation
      </Typography>

      <Stack flex={1} alignItems="center" justifyContent="center">
        {recommend ? (
          <>
            <Typography variant="h4" component="span">
              {`“${getCropName()}”`}
            </Typography>

            <Typography>{recommend.description}</Typography>
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
        nextText={recommend ? `SELECT ${getCropName()}` : "SELECT"}
        nextButtonProps={{ onClick: clickNext, disabled: !recommend }}
      />
    </>
  );
};

export default RecommendPage;
