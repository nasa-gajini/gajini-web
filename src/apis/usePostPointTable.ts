import { useEffect, useState } from "react";

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

const usePostPointTable = (
  params: PostPointTableParams,
  enabled: boolean = false,
): PointTableDto | undefined => {
  const [tableData, setTableData] = useState<PointTableDto>();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const fetchData = async () => {
      await axios
        .post("/api/point", params)
        .then((response: any) => {
          setTableData(response.data.data);
        })
        .catch((error: unknown) => {
          console.log(error);
        });
    };

    fetchData();
  }, [enabled]);

  useEffect(() => {
    console.log("tableData in hook", tableData);
  }, [tableData]);

  return tableData;
};

export default usePostPointTable;
