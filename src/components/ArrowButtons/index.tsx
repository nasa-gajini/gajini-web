import { Button, ButtonProps, Stack } from "@mui/material";

const ArrowButtons = ({
  prevButtonProps,
  nextButtonProps,
}: {
  prevButtonProps?: ButtonProps;
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
        Prev
      </Button>

      <Button variant="contained" {...nextButtonProps}>
        Next
      </Button>
    </Stack>
  );
};

export default ArrowButtons;
