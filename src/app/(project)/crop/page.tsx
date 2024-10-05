"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Select, MenuItem, Typography, Stack } from "@mui/material";

import ArrowButtons from "@/components/ArrowButtons";

const CropPage = () => {
  const router = useRouter();

  const [crop, setCrop] = useState<string>();

  const clickPrev = () => {
    router.push("/status");
  };

  const clickNext = () => {};

  return (
    <>
      <Typography variant="subtitle1" textAlign="center" p={2}>
        Step 3. 어떤 작물을 심으셨나요?
      </Typography>

      <Stack flex={1} alignItems="center" pt={10}>
        <Select
          value={crop}
          sx={{ width: "600px" }}
          onChange={(e) => setCrop(e.target.value)}
        >
          {[
            { value: "옥수수", label: "옥수수" },
            { value: "감자", label: "감자" },
            { value: "밀", label: "밀" },
            { value: "쌀", label: "쌀" },
            { value: "고구마", label: "고구마" },
            { value: "보리", label: "보리" },
            { value: "귀리", label: "귀리" },
          ].map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      <ArrowButtons
        prevButtonProps={{ onClick: clickPrev }}
        nextButtonProps={{ onClick: clickNext, disabled: !crop }}
      />
    </>
  );
};

export default CropPage;
