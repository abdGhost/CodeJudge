import { useEffect, useState } from "react";
import { getProblems } from "../api/problems";
import ProblemCard from "../components/ProblemCard";

export default function Dashboard() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You are not logged in");
          return;
        }

        const data = await getProblems(token);

        // handle both array or { data: [...] }
        setProblems(Array.isArray(data) ? data : data?.data ?? []);
      } catch (err) {
        console.error(err);
        setError("Failed to load problems");
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  if (loading) {
    return <p className="p-4">Loading problems...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Problems</h1>

      {problems.length === 0 ? (
        <p>No problems found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      )}
    </div>
  );
}
