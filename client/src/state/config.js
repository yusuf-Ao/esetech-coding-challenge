import axios from 'axios';

let USERFROMLS = localStorage.getItem('esetech-user') ? JSON.parse(localStorage.getItem('esetech-user')) : null

const instance = axios.create({
	baseURL: 'http://localhost:3000/api/v1/',
	headers: {
		// 'Content-Type': 'application/json',
	},
})

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

instance.interceptors.request.use(
	(req) => {
		USERFROMLS = localStorage.getItem('esetech-user') ? JSON.parse(localStorage.getItem('esetech-user')) : null
		if (USERFROMLS) {
			req.headers['Authorization'] = `Bearer ${USERFROMLS.accessToken}`
		}
		return req
	},
	(error) => {
		return Promise.reject(error)
	}
)

instance.interceptors.response.use(
	(res) => {
		// Return response as it is
		return res;
	},
	async (err) => {
		const originalConfig = err.config

		if (err.response) {
			if (err.response.status === 401 && !originalConfig._retry) {
				originalConfig._retry = true;
				
			    return Promise.reject(err);
			}
		}
		return Promise.reject(err)
	}
)

export const API = instance
