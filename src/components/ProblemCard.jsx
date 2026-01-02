import { Link } from "react-router-dom";

export default function ProblemCard({problem}){
    return (
        <div className="border p-4 rounded shadow hover:shadow-lg transition">
            <h2 className="text-xl font-bold">{problem.title}</h2>
            <p className="text-gray-600">{problem.difficulty}</p>
            <Link
                to={`/problems/${problem.id}`}
                className="text-blue-500 hover:underline mt-2 block"
            >
            View & Submit
            </Link>
        </div>
    );
}






























