import { useEffect, useState } from "react";

const useColorMappedImage = (imgSrc: string) => {
  const [colorMappedImage, setColorMappedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!imgSrc) return;

    const img = new Image();
    img.crossOrigin = "Anonymous"; // CORS 설정 필요시
    img.src = imgSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // 픽셀 데이터를 순회하며 색상 변환
      for (let i = 0; i < data.length; i += 4) {
        const grayscale = data[i]; // R값만 사용

        if (grayscale > 100) {
          // 흰색에 가까운 경우 -> 주황색
          data[i] = 255; // 빨강
          data[i + 1] = 255; // 녹색 (노란색의 RGB)
          data[i + 2] = 0; // 파랑
        } else if (grayscale > 50) {
          // 회색에 가까운 경우 -> 초록색
          data[i] = 0;
          data[i + 1] = 255; // 초록
          data[i + 2] = 0;
        } else if (grayscale > 1) {
          // 검정색에 가까운 경우 -> 빨강색
          data[i] = 255;
          data[i + 1] = 0; // 녹색
          data[i + 2] = 0; // 파랑 (빨간색의 RGB)
        } else {
          data[i + 3] = 0;
        }
      }

      // 변환된 이미지 데이터를 캔버스에 다시 그리기
      ctx.putImageData(imageData, 0, 0);

      // 캔버스를 이미지로 변환하여 상태 업데이트
      const newImgSrc = canvas.toDataURL();
      setColorMappedImage(newImgSrc);
    };
  }, [imgSrc]);

  return colorMappedImage;
};

export default useColorMappedImage;
