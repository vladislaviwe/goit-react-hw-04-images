import axios from "axios";

const instance = axios.create({
    baseURL: 'https://pixabay.com/api',
    params: {
        key: '29393857-621a457e4e6b44715a66c2c62',
        per_page: 12,
    }
})

export const getImages = async(page = 1) => {
    const { data } = await instance.get("/?", {
        params: {
            page
        }
    });
    return data;
}

export const searchImages = async(q, page = 1) => {
    const { data } = await instance.get("/?", {
        params: {
            page,
            q,
        }
    });
    return data;
}