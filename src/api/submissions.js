import axios from "axios";

export const submitCode = async (payload, token)=> {
    const res = await axios.post(`${API_URL}/submissions/`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res.data;
};

export const getMySubmissions = async (getProblemId, token) => {
    const res = await axios.get(
        `${API_URL}/submissions/problems/${problemsId}`,
        {
            headers: {
                Authorization:`Bearer ${token}`
            }
        }
    );
    return res.data;
}























