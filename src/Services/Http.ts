import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
	baseURL: "http://localhost:3000",
});

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			localStorage.removeItem("accessToken");
			window.location.href = "/signin";
		}
		return Promise.reject(error);
	}
);

type HTTPRequestConfig = AxiosRequestConfig;

const api = (axios: AxiosInstance) => {
	return {
		get: <T>(url: string, config: HTTPRequestConfig = {}) => {
			return axios.get<T>(url, config);
		},
		delete: <T>(url: string, config: HTTPRequestConfig = {}) => {
			return axios.delete<T>(url, config);
		},
		put: <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
			return axios.put<T>(url, body, config);
		},
		patch: <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
			return axios.patch<T>(url, body, config);
		},
		post: <T>(url: string, body: unknown, config: HTTPRequestConfig = {}) => {
			return axios.post<T>(url, body, config);
		},
	};
};

export const Http = api(axiosInstance);
