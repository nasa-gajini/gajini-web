"use client";

import { PropsWithChildren } from "react";

import { Box } from "@mui/material";
import RectangleProvider from "@/providers/Rectangle";

const ProjectLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box width="100%" height="100vh" display="flex" flexDirection="column">
      <RectangleProvider>{children}</RectangleProvider>
    </Box>
  );
};

export default ProjectLayout;
