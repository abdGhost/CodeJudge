import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function SubmissionDetail(){
    const {id} = useParams();
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const fetchSubmission = async ()=> {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    `http://127.0.0.1:8005/submissions/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer  ${token}`
                        }
                    }
                )
            } catch (err){
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchSubmission();
    }, [id]);

    if (loading) return <p>Loading...</p>
    if (!submission) return <p>Submission not found</p>

    return (
        <div className="max-w-5xl mx-auto space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">
                    Submission #{submission.id}
                </h1>
                <Link 
                    to={`/problems/${submission.problem.id}`}
                    className="text-blue-600 underline"
                >
                    {submission.problem.title}
                </Link>
            </div>

            {/* META INFO */}
            <div className="grid grid-cols-2 md: grid-cols-4 gap-4">
                <Info label="Status" value={submission.status} />
                <Info label="Runtime" value={`${submission.runtime ?? "-"} ms`}/>
                <Info label="Language" value={submission.language} />
                <Info 
                    label= "Submitted"
                    value= {new Date(submission.craeted_at).toLocaleString()}
                />
            </div>

            {/* OUTPUT / ERROR */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Output</h2>
                <pre className="bg-gray-900 text-green-300 p-4 rounded overflow-x-auto">
                    {submission.output || "No output"}
                </pre>
            </div>

            {submission.error && (
                <div>
                    <h2 className="text-xl font-semibold mb-2 text-red-600">Error</h2>
                    <pre className="bg-red-100 text-red-800 p-4 rounded overflow-x-auto">
                        {submission.error}
                    </pre>
                </div>
            )}

            {/* CODE */}
            <div>
                <h2 className="text-xl font-semibold mb-2">
                    Submitted Code
                </h2>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                    {submission.code}
                </pre>
            </div>
        </div>
    );

    function Info ({ label, value}){
        return (
            <div className="border rounded p-3">
                <div className="text-gray-500 text-sm">
                    {label}
                </div>
                <div className="font-semibold">
                    {value}
                </div>
            </div>
        )
    }
}













































