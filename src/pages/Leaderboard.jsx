import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Leaderboard(){
    const {id} = useParams();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const fetchLeaderboard = async ()=> {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get(`http://127.0.0.1:8005/leaderboard/problem/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
            }catch (err){
                console.log(err)
            }finally{
                setLoading(false)
            }
        };
        fetchLeaderboard();
    },[id]);

    if (loading) return <div>Loading leaderboard...</div>

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
            <table className="w-full border">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 border">Rank</th>
                        <th className="p-2 border">User</th>
                        <th className="p-2 border">Runtime (ms)</th>
                        <th className="p-2 border">Submitted At</th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row,index)=> (
                        <tr key={row.id} className="text-center">
                            <td className="border p-2">{index + 1}</td>
                            <td className="border p-2">{row.user?.username}</td>
                            <td className="border p-2">{row.runtime}</td>
                            <td className="border p-2">
                                {new Date(row.created_at).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )


}






























