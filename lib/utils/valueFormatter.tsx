import { ValueFormats } from "@/services/types/format";

export const valueFormatter = (value: number, type: ValueFormats) => {
  switch (type) {
    case "metric":
      return new Intl.NumberFormat("en-US", {
        style: "unit",
        unit: "meter",
      }).format(value);
    case "imperial":
      return new Intl.NumberFormat("en-US", {
        style: "unit",
        unit: "mile",
      }).format(value);
    case "mass":
      return new Intl.NumberFormat("en-US", {
        style: "unit",
        unit: "kilogram",
      }).format(value);
    case "standard":
    default:
      return new Intl.NumberFormat("en-US", {
        style: "decimal",
      }).format(value);
  }
};
