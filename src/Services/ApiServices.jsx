import axios from 'axios'
import { useCallback, useMemo } from 'react'
function useApiServices() {
    const api = useMemo(() => axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL || "https://localhost:7151/api/"
    }), [])

    useMemo(() => api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);

        }), [api])

    const getApi = useCallback(async (url) => {
        const response = await api.get(url);
        return response.data;
    }, [api]);

    // POST
    const postApi = useCallback(async (url, data) => {
        const response = await api.post(url, data);
        return response.data;
    }, [api]);

    // DELETE
    const deleteApi = useCallback(async (url) => {
        const response = await api.delete(url);
        return response.data;
    }, [api]);
    return { getApi, postApi, deleteApi }
}

export default useApiServices
