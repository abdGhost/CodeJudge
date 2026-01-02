import axios from "axios";

const API_URL = "http://127.0.0.1:8005";

export const loginUser = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
    });
    return res.data;
};

export const register = async (username, email, password) => {
    const res = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
    });
    return res.data;
}











