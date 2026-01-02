import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { submitCode } from "../api/submissions";


export default function CodeEditor({payload}){
    const [code, setCode] = useState(`print("Hello World")`);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async ()=> {
        setLoading(true);
        setResult(null);

        try {
            const token = localStorage.getItem("token");

            const data = await submitCode({
                problrem_id: problemId,
                language: "python",
                code,
            },
            token
        );
        setResult(data);

        } catch (err){
            setResult({
                status: "ERROR",
                message: err.response?.data?.detail || "Submission failed",
            });
        }
        setLoading(false)
    };
    return (
        <div className="mt-4">
            <Editor 
                height="400px"
                language="python"
                value={code}
                onChange={(value)=> setCode(value)}
            />

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                {loading ? "Submitting...": "Submit"}
            </button>
            {
                result && (
                    <div className="mt-4 p-3 border rounded bg-gray-100">
                        <p><strong>Status:</strong>{result.status}</p>
                        {result.runtime && <p>Runtime: {result.runtime} ms</p>}
                        {result.message && <p>{result.message}</p>}
                    </div>
                )
            }
        </div>
    );
}






























