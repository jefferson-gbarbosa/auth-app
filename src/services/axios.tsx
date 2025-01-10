import axios from 'axios';
import Cookies from 'js-cookie'

// Create axios instance
const api = axios.create({
    baseURL: 'http://localhost:3000/auth',
    withCredentials: true, // Ensure cookies are sent along with requests
});

// // Request interceptor to add the token
api.interceptors.request.use(
  (config) => {
      const headers = config.headers ?? {} 
      const token = Cookies.get("token")
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
      config.headers = headers
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);
//Cria um tipo que irá servir de base para as requests falhadas
type FailedRequestQueue = {
  onSuccess: (newToken: string) => void
  onFailure: () => void
}

let failedRequestsQueue: FailedRequestQueue[] = []
let isRefreshing = false
  
//Interceptador para verificar se o token expirou
api.interceptors.response.use(
    response => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        if(!isRefreshing){
          isRefreshing = true
          try{
            const res = await generateRefreshToken()
            Cookies.set("token", res.token)
            failedRequestsQueue.forEach(request => {
              request.onSuccess(res.token)
            })
          }catch{
            Cookies.remove("token");
            Cookies.remove("refreshToken");
            failedRequestsQueue.forEach(request => {
              request.onFailure()
            })
          }finally{
            failedRequestsQueue = []
            isRefreshing = false
          }
        }
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (newToken: string) => {
              originalRequest.headers!['Authorization'] = `${newToken}`
              resolve(api(originalRequest))
            },
            onFailure: () => {
              reject(error)
            }
          })
        })
      }else{
        Cookies.remove("token");
        Cookies.remove("refreshToken");
      }
  
      return Promise.reject(error);
    } 
  );
  
const generateRefreshToken = async () => {
    try {
      const response = await api.get('/refresh');
      return response.data;
    } catch (error) {
        console.log(error)
  };
}

export { api };
