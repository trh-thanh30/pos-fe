// src/lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // nếu dùng cookie JWT (quan trọng cho Next.js auth)
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Optional: interceptor để xử lý token (nếu bạn dùng access token)
// api.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accessToken"); // hoặc từ Redux/Context
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Optional: interceptor để xử lý lỗi (ví dụ: token hết hạn)
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     // Nếu muốn xử lý refresh token thì làm ở đây
//     return Promise.reject(error);
//   }
// );

export default api;
