"use client";

import { useRouter } from "next/navigation";

import { Typography, Stack } from "@mui/material";

import ArrowButtons from "@/components/ArrowButtons";

const RecommendPage = () => {
  const router = useRouter();

  const clickPrev = () => {
    router.push("/status");
  };

  return (
    <>
      <Typography variant="subtitle1" textAlign="center" p={1}>
        Step 3. 적합한 작물을 추천해주세요
      </Typography>

      <Stack>
        <Typography textAlign="center" whiteSpace="pre-line">
          {
            "강수량, 증발산량, 토지 수분함량, 기후, 온도 등 5개년, 52종의 데이터를 종합해보았을 때,\n현재 농지와 시기에 가장 적합한 작물은"
          }
          <Typography variant="h4" component="span">
            “옥수수”
          </Typography>
          입니다.
        </Typography>
      </Stack>

      <ArrowButtons prevButtonProps={{ onClick: clickPrev }} />
    </>
  );
};

export default RecommendPage;
