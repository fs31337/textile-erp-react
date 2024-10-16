import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

export const login = (credentials: { email: string; password: string }) => {
  return axios.post(`${API_BASE_URL}/login`, credentials);
};

export const logout = () => {
  return axios.post(`${API_BASE_URL}/logout`);
};
