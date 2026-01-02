import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Submissions(){
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const fetchSubmissions = async ()=> {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get(
                    "http://127.0.0.1:8005/submissions/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                setSubmissions(res.data);
            } catch (err){
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();

    },[]);

    if (loading) return <p>Loading submissions...</p>

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">My Submissions</h1>

            <table className="w-full border">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 border">#</th>
                        <th className="p-2 border">Problem</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Runtime</th>
                        <th className="p-2 border">Submitted At</th>
                    </tr>
                </thead>

                <tbody>
                    {submissions.map((s, index)=> (
                        <tr key={s.id} className="text-center">
                            <td className="border p-2">{index + 1}</td>

                            <td className="border p-2">
                                <Link
                                to={`/problems/${s.problem.id}`}
                                className="text-blue-600 hover:underline"
                                >
                                    {s.problem.title}
                                </Link>
                            </td>

                            <td className="border p-2">
                                <span
                                    className={`px-2 py-1 rounded text-white ${
                                        s.status === "Accepted" 
                                        ? "bg-green-600"
                                        : "bg-red-500"
                                    }`}
                                >
                                    {s.status}
                                </span>
                            </td>

                            <td className="border p-2">{s.runtime ?? "-"} ms</td>

                            <td className="border p-2">
                                    {new Date(s.created_at).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )



}











































