import axios from "axios";

const API_URL = "http://127.0.0.1:8005";

export const getProblems = async (token) => {
    const res = await axios.get(`${API_URL}/problems/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res.data;
}

export const getProblemId = async (id, token) => {
    const res = await axios.get(`${API_URL}/problems/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
}






























