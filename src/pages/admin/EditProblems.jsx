import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditProblem(){
    const {id} = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        difficulty: "Easy",
        time_limit: 1,
    });

    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const fetchProblem = async ()=> {
            try{
                const res = await axios.get(
                    `http://127.0.0.1:8005/problems/${id}`
                );
                setForm({
                    title: res.data.title,
                    description: res.data.description,
                    difficulty: res.data.difficulty,
                    time_limit: res.data.time_limit
                });

            }catch(err){
                alert("Failed to load problem")
            }finally {
                setLoading(false)
            }
        }
        fetchProblem();
    }, [id]);

    const handleChange= (e)=> {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const handleSubmit = async (e)=> {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            await axios.put(`http://127.0.0.1:8004/problems/${id}`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            navigate("/admin/problems");

        }catch(err){
            alert(err.response?.data?.detail || "Update failed");
        }
    };

    if(loading) return <p>Loading...</p>

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">
                Edit Problem
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
                <textarea 
                    name="description"
                    rows={6}
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <select
                    name="difficulty"
                    value={form.difficulty}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>

                <input 
                    type="number"
                    name="time_limit"
                    value={form.time_limit}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <button className="bg-green-600 text-white px-6 py-2 rounded">
                    Update Problem
                </button>
            </form>
        </div>
    );

}



































