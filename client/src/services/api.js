import axios from "axios"

const API_BASE_URL = "https://robotics-lab.onrender.com/api"

const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (userData) => api.post("/auth/register", userData),
}

export const studentAPI = {
  getAll: (params) => api.get("/students", { params }),
  getById: (id) => api.get(`/students/${id}`),
  create: (data) => api.post("/students", data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
  scanQR: (qrCode) => api.post("/students/scan", { qrCode }),
}

export const attendanceAPI = {
  record: (data) => api.post("/attendance/record", data),
  recordTimeOut: (data) => api.put("/attendance/timeout", data),
  getByStudent: (studentId, params) => api.get(`/attendance/student/${studentId}`, { params }),
  getToday: () => api.get("/attendance/today"),
}

export const behaviorAPI = {
  create: (data) => api.post("/behavior", data),
  getAll: (params) => api.get("/behavior", { params }),
  update: (id, data) => api.put(`/behavior/${id}`, data),
}

export const parentAPI = {
  sendCommunication: (data) => api.post("/parents/communicate", data),
  getCommunications: (params) => api.get("/parents/communications", { params }),
}

export const qrAPI = {
  generate: (data) => api.post("/qr/generate", { data }),
  scan: (qrData) => api.post("/qr/scan", { qrData }),
}

export default api
