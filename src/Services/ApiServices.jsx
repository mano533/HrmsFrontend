import axios from 'axios'
import React from 'react'

function useApiServices() {

    let urlENV = import.meta.env

    let api = axios.create({
        baseURL: urlENV
    })

    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);

        })

    const getApi = async () => {
        const response = await api.get(url);
        return response.data;
    }

    // POST
    const postApi = async (url, data) => {
        const response = await api.post(url, data);
        return response.data;
    };

    // DELETE
    const deleteApi = async (url) => {
        const response = await api.delete(url);
        return response.data;
    };
    return { getApi, postApi, deleteApi }
}

export default useApiServices