import { useState } from "react";

import { COMMON_BUTTON_SX } from "@/components/Chatbot/constants";

import { Stack, Button, Typography } from "@mui/material";
import { WaterDrop, Close } from "@mui/icons-material";

const Chatbot = () => {
  const [isChatbotOpened, setChatbotOpened] = useState<boolean>(false);

  return (
    <Stack
      alignItems="flex-end"
      gap={2}
      zIndex={99999}
      sx={{ position: "fixed", bottom: "10px", right: "10px" }}
    >
      {isChatbotOpened && (
        <Stack
          width={420}
          maxHeight={620}
          gap={1}
          p={2}
          borderRadius={2}
          sx={{ ...COMMON_BUTTON_SX, overflowY: "auto" }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle2">무엇을 도와드릴까요?</Typography>

            <Button
              color="inherit"
              sx={{ minWidth: 0, p: 0 }}
              onClick={() => setChatbotOpened(false)}
            >
              <Close />
            </Button>
          </Stack>

          <Button variant="outlined" size="small">
            그래프 해석
          </Button>

          <Button variant="outlined" size="small">
            관개 전략 추천
          </Button>
        </Stack>
      )}

      <Button
        variant="contained"
        sx={{
          ...COMMON_BUTTON_SX,
          width: 70,
          height: 70,
          borderRadius: 4,
        }}
        onClick={() => setChatbotOpened((prev) => !prev)}
      >
        <WaterDrop fontSize="large" />
      </Button>
    </Stack>
  );
};

export default Chatbot;
