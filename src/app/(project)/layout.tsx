"use client";

import { PropsWithChildren } from "react";

import { Box } from "@mui/material";

const ProjectLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box width="100%" height="100vh" display="flex" flexDirection="column">
      {children}
    </Box>
  );
};

export default ProjectLayout;
