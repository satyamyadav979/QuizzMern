import { axiosInstance } from "./index";
import { API_BASE_URL } from "./config";

export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/app/users/register`, userData);
        return response.data;
    } catch (error) {
        return error?.response?.data;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/app/users/login`, userData);
        console.log(response);
        return response.data;
    } catch (error) {
        return error?.response?.data;
    }
};

export const getUsers = async () => {
    try {
        const response = await axiosInstance.get(`${API_BASE_URL}/app/users/profile`);
        return response.data;
    } catch (error) {
        return error?.response?.data;
    }
};
