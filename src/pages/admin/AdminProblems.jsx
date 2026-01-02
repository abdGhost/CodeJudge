import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminProblems(){
    const [problems, setProblems] = useState([]);

    useEffect(()=> {
        const fetchProblems = async ()=> {
            const token = localStorage.getItem("token");

            const res = await axios.get("http://127.0.0.1:8005/problems", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setProblems(res.data);
        };
        fetchProblems();
    }, []);


    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between mb-4">
                <h1 className="text-3xl font-bold">Manage Problems</h1>

                <Link
                to="/admin/problems/create"
                className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                + Add Problem</Link>
            </div>

            <table className="w-full border">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Difficulty</th>
                    </tr>
                </thead>
            <tbody>
                {problems.map((p)=> (
                    <tr key={p.id}>
                        <td className="border p-2">{p.id}</td>
                        <td className="border p-2">{p.title}</td>
                        <td className="border p-2">{p.difficulty}</td>
                        <td className="border p-2 space-x-2">
                            <Link 
                            className="text-blue-600"
                            to={`/admin/probelms/${p.id}/edit`}
                            >
                                Edit
                            </Link>
                            <Link
                            className="text-green-600"
                            to={`/admin/problems/${p.id}/testcases`}
                            >
                            Testcases
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}


































