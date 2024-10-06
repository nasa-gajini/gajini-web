import { useEffect, useState } from "react";

const axios = require("axios");

export interface Params {
  data_field: string;
  is_range: boolean;
  p1: number[];
  p2: number[];
}

const usePostOverlayImage = (params: Params): string | undefined => {
  const [decodedImage, setDecodedImage] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .post("/api/image", params)
        .then((response: any) => {
          setDecodedImage(`data:image/png;base64,${response.data.data}`);
        })
        .catch((error: unknown) => {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  return decodedImage;
};

export default usePostOverlayImage;
