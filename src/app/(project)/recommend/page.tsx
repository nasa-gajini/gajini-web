"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Lottie from "react-lottie-player";

import { Route } from "@/constants/route";

import { Typography, Stack } from "@mui/material";
import ArrowButtons from "@/components/ArrowButtons";

import lottieJson from "../../../../public/assets/images/search.json";

const RecommendPage = () => {
  const router = useRouter();

  const [recommendedCrop, setRecommendedCrop] = useState<string>();

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
            <Typography textAlign="center" whiteSpace="pre-line">
              {
                "강수량, 증발산량, 토지 수분함량, 기온 등 5개년, 52종의 데이터를 종합해보았을 때,\n현재 농지와 시기에 가장 적합한 작물은"
              }
              <Typography variant="h4" component="span">
                {`“${recommendedCrop}”`}
              </Typography>
              입니다.
            </Typography>
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
              분석 중입니다. 잠시만 기다려주세요.
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
