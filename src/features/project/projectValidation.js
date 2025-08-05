// src/features/project/projectValidation.js
import * as Yup from "yup";

export const projectSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  desc: Yup.string().required("Description is required"),
  docs: Yup.mixed().nullable(), // optional
  skillset: Yup.string().required("At least one skill"),
  payment_type: Yup.number()
    .oneOf([1, 2], "Select payment type")
    .required("Payment type is required"),
  price: Yup.number().required("Price is required"),
  status: Yup.string()
    .oneOf(["started", "ongoing", "ended"], "Invalid status")
    .required("Status is required"),
  freelancer: Yup.number().nullable().typeError("Freelancer must be a user ID"),
});
