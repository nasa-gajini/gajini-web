"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Route } from "@/constants/route";

import { Typography, Button, Stack } from "@mui/material";
import ArrowButtons from "@/components/ArrowButtons";

const StatusPage = () => {
  const router = useRouter();

  const [url, setURL] = useState<Route>();

  const clickPrev = () => {
    router.push(Route.Boundary);
  };

  const clickNext = () => {
    if (!url) {
      return;
    }

    router.push(url);
  };

  return (
    <>
      <Typography variant="subtitle1" textAlign="center" p={2}>
        Step 2. 현재 상태를 알려주세요
      </Typography>

      <Stack flex={1} gap={2} alignItems="center" justifyContent="center">
        <Button
          variant={url === Route.Recommend ? "contained" : "outlined"}
          sx={{ width: "600px" }}
          onClick={() => setURL(Route.Recommend)}
        >
          제 농지에 적합한 작물을 추천받고 싶어요
        </Button>

        <Button
          variant={url === Route.Crop ? "contained" : "outlined"}
          sx={{ width: "600px" }}
          onClick={() => setURL(Route.Crop)}
        >
          이미 작물을 심었어요
        </Button>
      </Stack>

      <ArrowButtons
        prevButtonProps={{ onClick: clickPrev }}
        nextButtonProps={{ onClick: clickNext, disabled: !url }}
      />
    </>
  );
};

export default StatusPage;
