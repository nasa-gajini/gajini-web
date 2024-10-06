"use client";

import { PropsWithChildren } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Box } from "@mui/material";
import RectangleProvider from "@/providers/Rectangle";

const ProjectLayout = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Box width="100%" height="100vh" display="flex" flexDirection="column">
        <RectangleProvider>{children}</RectangleProvider>
      </Box>
    </QueryClientProvider>
  );
};

export default ProjectLayout;
