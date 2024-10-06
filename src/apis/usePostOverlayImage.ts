import { useMutation, useQuery } from "@tanstack/react-query";

const axios = require("axios");

export interface Params {
  data_field: string;
  is_range: boolean;
  p1: number[];
  p2: number[];
}

const postOverlayImage = async (params: Params): Promise<{ data: string }> => {
  const response = await axios.post("/api/img", params);

  return response.data;
};

const usePostOverlayImage = (params: Params, enabled: boolean) => {
  return useQuery({
    queryKey: ["overlayImage", params],
    queryFn: () => postOverlayImage(params),
    enabled,
  });
};

export default usePostOverlayImage;
