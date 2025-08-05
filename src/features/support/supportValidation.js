// src/features/support/supportValidation.js
import * as Yup from "yup";

export const supportSchema = Yup.object({
  project: Yup.number()
    .required("Project is required")
    .typeError("Select a project"),
  desc: Yup.string().required("Description is required"),
  docs: Yup.mixed().nullable(),
  status: Yup.string()
    .oneOf(["open", "in_progress", "closed"], "Invalid status")
    .required("Status is required"),
});
