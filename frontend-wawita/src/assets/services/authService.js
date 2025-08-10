import API from "./api"

export const login = async (credentials) => {
    const res = await API.post("/auth/login", credentials)
    return res.data
}

export const register = async (data) => {
    const res = await API.post("/auth/register", data)
    return res.data
}

export const getUserProfile = async (token) => {
    const res = await API.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}
