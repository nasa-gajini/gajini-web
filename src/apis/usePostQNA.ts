import { useMutation } from "@tanstack/react-query";

const axios = require("axios");

export interface QNAParams {
  p1: number[];
  p2: number[];
  crop_type: number;
  query: string;
}

export interface QNADto {
  answer: string;
}

const postQNA = async (params: QNAParams): Promise<QNADto> => {
  const response = await axios.post("/api/qna", params);

  return response.data;
};

const usePostQNA = () => {
  return useMutation({
    mutationFn: (params: QNAParams) => postQNA(params),
  });
};

export default usePostQNA;
