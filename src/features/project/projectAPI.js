// src/features/project/projectAPI.js
import client from '../../api/client';

const BASE = '/api/project/'; 

function sendFormData(formData, method = 'post', id) {
  const url = id ? `${BASE}${id}/` : BASE;
  return client({
    url,
    method,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export function fetchProjectsAPI(params = {}) {
  return client.get(BASE, { params });
}

export function createProjectAPI(formData) {
  return sendFormData(formData, 'post');
}

export function updateProjectAPI(id, formData) {
  return sendFormData(formData, 'put', id);
}

export function deleteProjectAPI(id) {
  return client.delete(`${BASE}${id}/`);
}
