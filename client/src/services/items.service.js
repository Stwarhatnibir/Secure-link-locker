import api from './api';

export const itemsService = {
  getAll: (params) => api.get('/items', { params }).then((r) => r.data.items),
  create: (data) => api.post('/items', data).then((r) => r.data.item),
  update: (id, data) => api.put(`/items/${id}`, data).then((r) => r.data.item),
  remove: (id) => api.delete(`/items/${id}`).then((r) => r.data),
};
