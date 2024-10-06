import { useMutation, useQuery } from "@tanstack/react-query";

const axios = require("axios");

export interface RecommendParams {
  p1: number[];
  p2: number[];
}

export interface RecommendDto {
  crop_type: number;
  description: string;
}

const postRecommend = async (
  params: RecommendParams,
): Promise<RecommendDto> => {
  const response = await axios.post("/api/recommend", params);

  return response.data;
};

const usePostRecommend = (params: RecommendParams, enabled: boolean) => {
  return useQuery({
    queryKey: ["recommend", params],
    queryFn: () => postRecommend(params),
    enabled,
  });
};

export default usePostRecommend;
