import instance from './instance'

const index = (number, size) => instance.get(`/gifts?page[number]=${number}&page[size]=${size}`)
const detail = (id) => instance.get(`/gifts/${id}`)
const wishlist = (id,data) => instance.post(`/gifts/${id}/wishlist`, data)

const api = {
    index,
    detail,
    wishlist
}

export default api 