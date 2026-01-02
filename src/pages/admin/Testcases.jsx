import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Testcases(){
    const {id} = useParams();
    const [testcases, setTestcases] = useState([]);
    const [form, setForm] = useState({
        input: "",
        expected_output: "",
        is_hidden: true,
    });

    const token = localStorage.getItem("token");

    const fetchTestcases = async ()=> {
        const res = await axios.get(
            `http://127.0.0.1:8005/testcases/problem/${id}`,
            {
                headers: {Authorization: `Bearer ${token}`},
            }
        );
        setTestcases(res.data);
    };

    useEffect(()=> {
        fetchTestcases();
    }, [id]);

    const handleSubmit = async (e)=> {
        e.preventDefault();

        await axios.post(
            "http://127.0.0.1:8005/testcases",
            {
                ...form,
                problem_id: Number(id),
            },
            {
                headers: {Authorization: `Bearer ${token}`},
            }
        );
        setForm({input: "", expected_output:"", is_hidden: true});
        fetchTestcases();
    };

    const deleteTestcase = async (testcaseId) => {
        if (!confirm("Delete this testcase?")) return;

        await axios.delete(
            `http://127.0.0.1:8005/testcases/${testcaseId}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
        fetchTestcases();
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">
                Testcases for Problem #{id}
            </h1>
            {/* ADD TESTCASE */}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                <textarea 
                    placeholder="Input"
                    className="w-full border p-2"
                    rows={3}
                    value={form.input}
                    onChange={(e)=> setForm({...form, input: e.target.value})}
                />

                <textarea 
                    placeholder="Expacted Output"
                    className="w-full border p-2"
                    rows={3}
                    value={form.expected_output}
                    onChange={(e)=>
                        setForm({...form, expected_output: e.target.value})
                    }
                />

                <label className="flex gap-2 items-center">
                    <input 
                        type="checkbox"
                        checked={form.is_hidden}
                        onChange={(e)=>
                            setForm({...form, is_hidden: e.target.checked})
                        }
                    />
                    Hidden testcase
                </label>

                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        Add Testcase
                </button>
            </form>


            {/* LIST TESTCASES */}
            <table className="w-full border">
                <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Input</th>
                            <th className="border p-2">Expected</th>
                            <th className="border p-2">Hidden</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                </thead>

                <tbody>
                    {testcases.map((tx)=> (
                        <tr key={tc.id}>
                            <td className="border p-2">{tc.id}</td>
                            <td className="border p-2 whitespace-pre-wrap">{tc.input}</td>
                            <td className="border p-2 whitespace-pre-wrap">{tc.expected_output}</td>
                            <td className="border p-2 text-center">{tc.is_hidden?"✅":"❌"}</td>
                            <td className="border p-2">
                                <button
                                    onClick={()=> deleteTestcase(tc.id)}
                                    className="text-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}






























