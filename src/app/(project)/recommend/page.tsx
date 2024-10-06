"use client";

import { useRouter } from "next/navigation";

import { Route } from "@/constants/route";

import { Typography, Stack } from "@mui/material";
import ArrowButtons from "@/components/ArrowButtons";

const RecommendPage = () => {
  const router = useRouter();

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
        <Typography textAlign="center" whiteSpace="pre-line">
          {
            "강수량, 증발산량, 토지 수분함량, 기온 등 5개년, 52종의 데이터를 종합해보았을 때,\n현재 농지와 시기에 가장 적합한 작물은"
          }
          <Typography variant="h4" component="span">
            “옥수수”
          </Typography>
          입니다.
        </Typography>
      </Stack>

      <ArrowButtons
        prevButtonProps={{ onClick: clickPrev }}
        nextButtonProps={{ onClick: clickNext }}
      />
    </>
  );
};

export default RecommendPage;
