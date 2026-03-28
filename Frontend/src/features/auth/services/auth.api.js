import axios from "axios"

const api = axios.create({
  baseURL: "https://gen-ai-model.onrender.com", // ✅ change yaha
  withCredentials: true
})

export async function register({ username, email, password }) {
  try {
    const response = await api.post('/api/auth/register', {
      username, email, password
    })
    return response.data
  } catch (err) {
    console.error("Register API error", err)
    const message = err?.response?.data?.message || err?.message || "Failed to register"
    throw new Error(message)
  }
}

export async function login({ email, password }) {
  try {
    const response = await api.post("/api/auth/login", {
      email, password
    })
    return response.data
  } catch (err) {
    console.error("Login API error", err)
    const message = err?.response?.data?.message || err?.message || "Failed to login"
    throw new Error(message)
  }
}

export async function logout() {
  try {
    const response = await api.get("/api/auth/logout")
    return response.data
  } catch (err) {
    console.error("Logout API error", err)
    throw err
  }
}

export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me")
    return response.data
  } catch (err) {
    console.error("GetMe API error", err)
    throw err
  }
}