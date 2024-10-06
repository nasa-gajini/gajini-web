export enum CropType {
  Wheat,
  Cotton,
  Corn,
  Chickpeas,
  Barley,
  DatePalms,
}

export const CROP_SELECT_OPTIONS: string[] = [
  "Wheat",
  "Rice",
  "Corn",
  "Sugarcane",
  "Potatoes",
  "Tomatoes",
  "Bananas",
  "Pistachios",
  "Dates",
  "Onions",
  "Grapes",
  "Almonds",
  "Sesame",
  "Olives",
  "Apples",
  "Peppers",
  "Watermelon",
  "Melons",
  "Oranges",
  "Lemons",
  "Avocados",
  "Cabbage",
  "Eggplant",
  "Squash",
  "Sweet Potatoes",
  "Peanuts",
  "Parsley",
  "Pecans",
  "Garlic",
];

export enum SMAPValue {
  SoilMoisture = "soil_moisture",
  VegetationWaterContent = "vegetation_water_content",
  VegetationOpacity = "vegetation_opacity",
  BulkDensity = "bulk_density",
  ClayFraction = "clay_fraction",
  SurfaceTemperature = "surface_temperature",
  StaticWaterBodyFraction = "static_water_body_fraction",
}

export const SMAP_RADIO_OPRIONS: { label: string; value: SMAPValue }[] = [
  { label: "Soil moisture", value: SMAPValue.SoilMoisture },
  {
    label: "Vegetation water content",
    value: SMAPValue.VegetationWaterContent,
  },
  { label: "Vegetation Opacity", value: SMAPValue.VegetationOpacity },
  { label: "Bulk density", value: SMAPValue.BulkDensity },
  { label: "Clay fraction", value: SMAPValue.ClayFraction },
  { label: "Surface temperature", value: SMAPValue.SurfaceTemperature },
  {
    label: "Static water body fraction",
    value: SMAPValue.StaticWaterBodyFraction,
  },
];

export enum MODISValue {
  NDVI = "NDVI",
  EVI = "EVI",
}
