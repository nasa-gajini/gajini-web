import { Button, ButtonProps, Stack } from "@mui/material";

const ArrowButtons = ({
  prevText = "PREV",
  prevButtonProps,
  nextText = "NEXT",
  nextButtonProps,
}: {
  prevText?: string;
  prevButtonProps?: ButtonProps;
  nextText?: string;
  nextButtonProps?: ButtonProps;
}) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      p={2}
    >
      <Button variant="outlined" {...prevButtonProps}>
        {prevText}
      </Button>

      <Button variant="contained" {...nextButtonProps}>
        {nextText}
      </Button>
    </Stack>
  );
};

export default ArrowButtons;
