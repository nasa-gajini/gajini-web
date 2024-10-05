"use client";

import { useRouter } from "next/navigation";

import { Select, MenuItem, Typography } from "@mui/material";

import ArrowButtons from "@/components/ArrowButtons";

const CropPage = () => {
  const router = useRouter();

  const clickPrev = () => {
    router.push("/status");
  };

  const clickNext = () => {};

  return (
    <>
      <Typography variant="subtitle1" textAlign="center" p={1}>
        Step 3. 어떤 작물을 심으셨나요?
      </Typography>

      <Select>
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

      <ArrowButtons
        prevButtonProps={{ onClick: clickPrev }}
        nextButtonProps={{ onClick: clickNext }}
      />
    </>
  );
};

export default CropPage;
