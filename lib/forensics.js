import areas from "@/data/forense/areas-pericia.json";
import editorial from "@/data/forense/textos-editoriais.json";

export const guidePath = "/areas-da-pericia";
export const { home, guide, universoForense } = editorial;
export const { lawAreas } = areas;
export const technicalFields = areas.technicalFields.map((field, index) => ({
  ...field,
  number: String(index + 1).padStart(2, "0"),
}));
export const lawChoices = [{ id: "todas", icon: "book", title: "Guia completo" }, ...lawAreas];

export function areaPath(id) {
  return id === "todas" ? guidePath : `${guidePath}?area=${id}`;
}

export function fieldAnchor(id) {
  return `tech-${id}`;
}
