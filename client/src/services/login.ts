import { request } from "../lib/request";


const baseUrl = "http://localhost:3030/users";

interface User {
  email: string;
  password: string;
  confirmPassword?: string;
}



export const login = async (data: User) => {
  const result = await request("POST", `${baseUrl}/login`, data);
  return result;
};

export const register = async (data: User) => {
  const result = await request("POST", `${baseUrl}/register`, data);
  return result;
};

export const logout = async () => {
  const result = await request("GET", `${baseUrl}/logout`);
  return result;
};
