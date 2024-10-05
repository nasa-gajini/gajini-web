"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Route } from "@/constants/route";
import { CROP_SELECT_OPTIONS } from "@/constants/crop";

import { Select, MenuItem, Typography, Stack } from "@mui/material";
import ArrowButtons from "@/components/ArrowButtons";

const CropPage = () => {
  const router = useRouter();

  const [crop, setCrop] = useState<string>();

  const clickPrev = () => {
    router.push(Route.Status);
  };

  const clickNext = () => {
    router.push(Route.Management);
  };

  return (
    <>
      <Typography variant="subtitle1" textAlign="center" p={2}>
        Step 3. 어떤 작물을 심으셨나요?
      </Typography>

      <Stack flex={1} alignItems="center" pt={10}>
        <Select
          value={crop}
          size="small"
          sx={{ width: "600px" }}
          displayEmpty
          renderValue={(value) => {
            if (!value) {
              return <Typography color="gray">Select crop</Typography>;
            }

            return value;
          }}
          onChange={(e) => setCrop(e.target.value)}
        >
          {CROP_SELECT_OPTIONS.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
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
