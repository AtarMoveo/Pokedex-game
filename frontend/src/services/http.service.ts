import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { utilService } from './util.service';

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : 'http://localhost:3000/api/'

const axios = Axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

axios.interceptors.request.use(
    (config) => {
        const token = utilService.getAccessToken()        
        
        if (token) {
            config.headers.Authorization = token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export const httpService = {
    get<T>(endpoint: string, data?: object): Promise<T> {
        return ajax<T>(endpoint, 'GET', data)
    },
    post<T>(endpoint: string, data?: object): Promise<T> {
        return ajax<T>(endpoint, 'POST', data)
    },
    put<T>(endpoint: string, data?: object): Promise<T> {
        return ajax<T>(endpoint, 'PUT', data)
    },
    delete<T>(endpoint: string, data?: object): Promise<T> {
        return ajax<T>(endpoint, 'DELETE', data)
    }
}

async function ajax<T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: object): Promise<T> {
    try {
        const config: AxiosRequestConfig = {
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : undefined
        }

        const res: AxiosResponse<T> = await axios(config)
        return res.data;
    } catch (err: unknown) {
        if (Axios.isAxiosError(err)) {
            console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
            console.dir(err)
            if (err.response && err.response.status === 401) {
                sessionStorage.clear()
                window.location.assign('/')
            }
        } else {
            console.error(`Non-Axios error: `, err)
        }
        throw err;
    }
}