import { createContext, useState, ReactNode } from "react";
import L from "leaflet";

interface RectangleInfoType {
  rectangleLayer: L.Layer;
  zoom: number;
}

export interface RectangleContextType {
  rectangleInfo: RectangleInfoType | null;
  setRectangleInfo: (info: RectangleInfoType | null) => void;
}

// Context 생성
export const RectangleContext = createContext<RectangleContextType | undefined>(
  undefined,
);

// Context Provider 컴포넌트
const RectangleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [rectangleInfo, setRectangleInfo] = useState<RectangleInfoType | null>(
    null,
  );

  return (
    <RectangleContext.Provider value={{ rectangleInfo, setRectangleInfo }}>
      {children}
    </RectangleContext.Provider>
  );
};

export default RectangleProvider;
