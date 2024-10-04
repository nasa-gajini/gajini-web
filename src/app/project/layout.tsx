"use client";

import { PropsWithChildren } from "react";

import HorizontalLinearStepper from "@/components/Stepper";

const ProjectLayout = ({ children }: PropsWithChildren) => {
  return <HorizontalLinearStepper>{children}</HorizontalLinearStepper>;
};

export default ProjectLayout;
