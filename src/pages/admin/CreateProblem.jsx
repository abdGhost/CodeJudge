import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function CreateProblem(){
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        difficulty: "Easy",
        time_limit: 1,
    });

    const hadnleChange = (e)=> {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e)=> {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await axios.post("http://127.0.0.1:8005", form , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }catch (err){
            alert(err.response?.data?.detail || "Failed to create problem");
        }
    }


    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Create Problem</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    name="title"
                    placeholder="Problem Title"
                    value={form.control}
                    onChange={hadnleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <textarea 
                    name="description"
                    placeholder="Problem Description"
                    value={form.description}
                    onChange={hadnleChange}
                    rows={6}
                    className="w-full border p-2 rounded"
                    required
                />

                <select
                name="difficulty"
                value={form.difficulty}
                onChange={hadnleChange} 
                className="w-full border p-2 rounded">
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>

                <input 
                    type="number"
                    name="time_limit"
                    min="1"
                    value={form.time_limit}
                    onChange={hadnleChange}
                    className="w-full border p-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Create Problem
                </button>
            </form>
        </div>
    );

}


























































