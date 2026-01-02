import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProblemId } from "../api/problems";
import CodeEditor from "../components/CodeEditor";

export default function ProblemDetail(){
    const {id} = useParams();
    const [problem, setProblem] = useState(null);

    useEffect(()=> {
        const loadProblem = async ()=> {
            const token = localStorage.getItem("token")
            const data = await getProblemId(id, token);
            setProblem(data)
        };
        loadProblem();
    }, [id]);

    if (!problem) return <div className="p-4">Loadng...</div>

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{problem.title}</h1>
            <p className="text-gray-700 mb-4">{problem.description}</p>

            <div className="bg-gray-100 rounded mb-4">
                <h3 className="font-semibold mb-2">Sample Test Cases</h3>
                {problem.test_cases?.map((tc)=> (
                    <div > 
                        <p><strong>Input:</strong>{tc.input}</p>
                        <p><strong>Output:</strong>{tc.output}</p>
                    </div>
                ))}
            </div>
            <CodeEditor problemId={problem.id}/>
        </div>
    );
}