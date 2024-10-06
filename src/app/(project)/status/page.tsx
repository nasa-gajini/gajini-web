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
        Step 2. Tell us about the current state of your farmland
      </Typography>

      <Stack flex={1} gap={2} alignItems="center" justifyContent="center">
        <Button
          variant={url === Route.Recommend ? "contained" : "outlined"}
          sx={{ width: "600px" }}
          onClick={() => setURL(Route.Recommend)}
        >
          I want recommendations for the right crops for my farmland
        </Button>

        <Button
          variant={url === Route.Crop ? "contained" : "outlined"}
          sx={{ width: "600px" }}
          onClick={() => setURL(Route.Crop)}
        >
          I've already planted crops
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
