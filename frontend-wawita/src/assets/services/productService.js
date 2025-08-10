import API from "./api"

export const getProductsService = async () => {
    const res = await API.get("/products")
    return res.data
}

export const getProductByIdService = async (id) => {
    const res = await API.get(`/products/${id}`)
    return res.data
}

export const createProductService = async (data) => {
    const res = await API.post("/products", data)
    return res.data
}

export const updateProductService = async (id, data) => {
    const res = await API.put(`/products/${id}`, data)
    return res.data
}

export const deleteProductService = async (id) => {
    const res = await API.delete(`/products/${id}`)
    return res.data
}

export const likeProductService = async (id) => {
    const res = await API.put(`/products/like/${id}`)
    return res.data
}