import { useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";

const axios = require("axios");

export interface PostPointTableParams {
  point?: number[];
}

export interface PointTableDto {
  smap: {
    Soil_Moisture_Retrieval_Data_AM_bulk_density: string;
    Soil_Moisture_Retrieval_Data_AM_clay_fraction: string;
    Soil_Moisture_Retrieval_Data_AM_soil_moisture: string;
    Soil_Moisture_Retrieval_Data_AM_static_water_body_fraction: string;
    Soil_Moisture_Retrieval_Data_AM_surface_temperature: string;
    Soil_Moisture_Retrieval_Data_AM_vegetation_opacity: string;
    Soil_Moisture_Retrieval_Data_AM_vegetation_water_content: string;
  };
  modis: {
    "MODIS_Grid_16Day_VI_CMG/Data Fields/CMG 0.05 Deg 16 days EVI": string;
    "MODIS_Grid_16Day_VI_CMG/Data Fields/CMG 0.05 Deg 16 days NDVI": string;
  };
}

const postPointTable = async (
  params: PostPointTableParams,
): Promise<PointTableDto> => {
  const response = await axios.post("/api/point", params);

  return response.data;
};

const usePostPointTable = () => {
  return useMutation({
    mutationFn: (params: PostPointTableParams) => postPointTable(params),
  });
};

export default usePostPointTable;
