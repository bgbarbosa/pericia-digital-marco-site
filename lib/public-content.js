const text = (value) => typeof value === "string" && value.trim().length > 0;
export const safeLink = (value) =>
  typeof value === "string" && /^https:\/\//.test(value);
export const safeImage = (value) =>
  typeof value === "string" &&
  /^\/(?!\/)[^?#]+\.(png|jpe?g|webp)$/i.test(value);
const hasFields = (entry, fields) =>
  entry &&
  entry.approved === true &&
  fields.every((field) => text(entry[field]));
export const approvedTrajectory = (entries) =>
  entries.filter((entry) =>
    hasFields(entry, [
      "title",
      "date",
      "institution",
      "theme",
      "role",
      "description",
      "source",
      "usage",
    ]),
  );
export const approvedDemonstrations = (entries) =>
  entries.filter(
    (entry) =>
      hasFields(entry, [
        "title",
        "image",
        "alt",
        "source",
        "usage",
        "technique",
        "observation",
        "indication",
        "limitation",
      ]) && safeImage(entry.image),
  );
