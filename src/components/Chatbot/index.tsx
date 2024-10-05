import { useState } from "react";

import { COMMON_BOX_SHADOW_SX } from "@/components/Chatbot/constants";

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
          width={390}
          maxHeight={690}
          gap={1}
          p={2}
          pt={1}
          borderRadius={4}
          sx={{ ...COMMON_BOX_SHADOW_SX, overflowY: "auto" }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle2">무엇을 도와드릴까요?</Typography>

            <Button
              size="small"
              color="inherit"
              sx={{ minWidth: 0, p: 0 }}
              onClick={() => setChatbotOpened(false)}
            >
              <Close />
            </Button>
          </Stack>

          <Button variant="outlined" size="small" sx={{ borderRadius: 2 }}>
            그래프 해석
          </Button>

          <Button variant="outlined" size="small" sx={{ borderRadius: 2 }}>
            관개 전략 추천
          </Button>
        </Stack>
      )}

      <Button
        variant="contained"
        sx={{
          ...COMMON_BOX_SHADOW_SX,
          width: 64,
          height: 64,
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
