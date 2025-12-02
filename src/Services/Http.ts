import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const { VITE_BASE_URL } = import.meta.env;

export const axiosInstance = axios.create({
	baseURL: `${VITE_BASE_URL}/api`,
	withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

interface FailedRequest {
	resolve: (token: string) => void;
	reject: (error: any) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token!);
		}
	});

	failedQueue = [];
};

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response &&
			error.response.status === 401 &&
			!originalRequest._retry
		) {
			if (isRefreshing) {
				return new Promise(function (resolve, reject) {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers["Authorization"] = "Bearer " + token;
						return axiosInstance(originalRequest);
					})
					.catch((err) => {
						return Promise.reject(err);
					});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const response = await axiosInstance.put<{ data: string }>(
					"/auth/refresh-token"
				);
				const accessToken = response.data.data;

				localStorage.setItem("accessToken", accessToken);
				axiosInstance.defaults.headers.common["Authorization"] =
					"Bearer " + accessToken;
				processQueue(null, accessToken);

				originalRequest.headers["Authorization"] = "Bearer " + accessToken;
				return axiosInstance(originalRequest);
			} catch (err) {
				processQueue(err, null);
				localStorage.removeItem("accessToken");
				localStorage.removeItem("user");
				window.location.href = "/signin";
				return Promise.reject(err);
			} finally {
				isRefreshing = false;
			}
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
