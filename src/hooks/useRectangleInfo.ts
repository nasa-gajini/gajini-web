import { useContext } from "react";

import { RectangleContext, RectangleContextType } from "@/providers/Rectangle";

// RectangleContext를 쉽게 사용할 수 있는 커스텀 훅
const useRectangleInfo = (): RectangleContextType => {
  const context = useContext(RectangleContext);

  if (!context) {
    throw new Error("useRectangle must be used within a RectangleProvider");
  }

  return context;
};

export default useRectangleInfo;
