// src/features/support/supportAPI.js
import client from "../../api/client";

const BASE = "/api/support/"; // adjust if your URL is e.g. '/api/support/support/'

function sendFormData(formData, method = "post", id) {
  const url = id ? `${BASE}${id}/` : BASE;
  return client({
    url,
    method,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function fetchTicketsAPI(params = {}) {
  return client.get(BASE, { params });
}

export function createTicketAPI(formData) {
  return sendFormData(formData, "post");
}

export function updateTicketAPI(id, formData) {
  return sendFormData(formData, "put", id);
}

export function deleteTicketAPI(id) {
  return client.delete(`${BASE}${id}/`);
}
