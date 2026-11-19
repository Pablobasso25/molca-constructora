import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('molca_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const projectService = {
  getAll: (params = {}) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
}

export const leadService = {
  create: (data) => api.post('/leads', data),
}

export const whatsappService = {
  trackClick: (data) => api.post('/whatsapp/click', data),
}

export const metricService = {
  getAll: () => api.get('/metrics'),
}

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
}

export default api
