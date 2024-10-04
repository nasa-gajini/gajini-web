"use client";

import { useRouter } from "next/navigation";

import { Box, Button, Typography } from "@mui/material";

export default function Home() {
  const router = useRouter();

  const moveToProject = () => {
    router.push("/project/boundary");
  };

  return (
    <Box p={1} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h3">Nasa Space Apps</Typography>
      <Typography>Gajini</Typography>

      <Button variant="contained" onClick={moveToProject}>
        Start Project
      </Button>
    </Box>
  );
}
