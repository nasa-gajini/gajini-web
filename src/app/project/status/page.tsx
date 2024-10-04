import { Typography, Button, Stack } from "@mui/material";

const StatusPage = () => {
  return (
    <Stack p={8} px={18} gap={2}>
      <Button variant="outlined">
        제 농지에 적합한 작물을 추천받고 싶어요
      </Button>

      <Button variant="outlined">이미 작물을 심었어요</Button>
    </Stack>
  );
};

export default StatusPage;
