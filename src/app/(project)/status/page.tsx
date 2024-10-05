"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Typography, Button } from "@mui/material";

import ArrowButtons from "@/components/ArrowButtons";

const StatusPage = () => {
  const router = useRouter();

  const [url, setURL] = useState<string>();

  const clickPrev = () => {
    router.push("/boundary");
  };

  const clickNext = () => {
    if (!url) {
      return;
    }

    router.push(url);
  };

  return (
    <>
      <Typography variant="subtitle1" textAlign="center" p={1}>
        Step 2. 현재 상태를 알려주세요
      </Typography>

      <Button variant="outlined" onClick={() => setURL("/recommend")}>
        제 농지에 적합한 작물을 추천받고 싶어요
      </Button>

      <Button variant="outlined" onClick={() => setURL("/crop")}>
        이미 작물을 심었어요
      </Button>

      <ArrowButtons
        prevButtonProps={{ onClick: clickPrev }}
        nextButtonProps={{ onClick: clickNext, disabled: !url }}
      />
    </>
  );
};

export default StatusPage;
