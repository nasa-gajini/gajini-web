import { Select, MenuItem, Button, Stack } from "@mui/material";

const CropPage = () => {
  return (
    <Stack p={8} px={24} gap={2}>
      <Select>
        {[
          { value: "옥수수", label: "옥수수" },
          { value: "감자", label: "감자" },
          { value: "밀", label: "밀" },
          { value: "쌀", label: "쌀" },
          { value: "고구마", label: "고구마" },
          { value: "보리", label: "보리" },
          { value: "귀리", label: "귀리" },
        ].map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default CropPage;
