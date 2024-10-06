import { useState } from "react";

import Lottie from "react-lottie-player";

import usePostQNA, { QNADto } from "@/apis/usePostQNA";

import useRectangleInfo from "@/hooks/useRectangleInfo";

import { COMMON_BOX_SHADOW_SX } from "@/components/Chatbot/constants";

import { Stack, Button, Typography, Box } from "@mui/material";
import { Close } from "@mui/icons-material";

import lottieJson from "../../../public/assets/json/tomato.json";
import { convertLatLngBoundsToArray } from "@/utils/map";

const Chatbot = () => {
  const [isChatbotOpened, setChatbotOpened] = useState<boolean>(false);
  const [qna, setQNA] = useState<({ question: string } & QNADto) | null>();

  const { ractangleInfo } = useRectangleInfo();

  const { mutate: postQNA } = usePostQNA();

  const handleClose = () => {
    setChatbotOpened(false);
    setQNA(null);
  };

  const handleQNA = (question: string) => {
    postQNA(
      {
        ...convertLatLngBoundsToArray(
          ractangleInfo!.rectangleLayer.getBounds(),
        ),
        crop_type: 1,
        query: question,
      },
      { onSuccess: (data) => setQNA({ question, answer: data.answer }) },
    );
  };

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
          bgcolor="white"
          p={2}
          pt={6}
          borderRadius={4}
          position="relative"
          sx={{ ...COMMON_BOX_SHADOW_SX, overflowY: "auto" }}
        >
          <Stack
            width={390}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            bgcolor="white"
            px={2}
            py={1}
            position="absolute"
            top={0}
            left={0}
          >
            <Typography variant="subtitle2" fontWeight="bold">
              {qna?.question || "How can we help?"}
            </Typography>

            <Button
              size="small"
              color="inherit"
              sx={{ minWidth: 0, p: 0 }}
              onClick={handleClose}
            >
              <Close />
            </Button>
          </Stack>

          {qna ? (
            <Typography>{qna.answer}</Typography>
          ) : (
            <>
              <Button
                variant="outlined"
                size="small"
                sx={{ borderRadius: 2 }}
                onClick={() => handleQNA("Irrigation strategy recommendations")}
              >
                Irrigation strategy recommendations
              </Button>
            </>
          )}
        </Stack>
      )}

      <Button
        sx={{
          ...COMMON_BOX_SHADOW_SX,
          width: 64,
          height: 64,
          p: 0,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
          overflow: "hidden",
        }}
        onClick={() => setChatbotOpened((prev) => !prev)}
      >
        <Box width={140} height={140} position="absolute">
          <Lottie
            play
            loop
            animationData={lottieJson}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      </Button>
    </Stack>
  );
};

export default Chatbot;
