import { Link, useNavigate } from "react-router-dom";
import {logout, isAuthenticated, isAdmin} from "../utils/auth";

export default function Navbar(){
    const navigate = useNavigate();

    const handleLogout = ()=> {
        logout();
        navigate("/login");
    };

    return (
        <div className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-6">
                <Link to="/" className="text-xl font-bold text-blue-400">
                    CodeJudge
                </Link>

                {isAuthenticated() && (
                    <>
                        <Link to="/" className="hover:text-blue-400">Problems</Link>
                        <Link to="/leaderboard/1" className="hover:text-blue-400">Leaderboard</Link>
                    </>
                )}
            </div>

            <div>
                {isAuthenticated() ? (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                    >
                        Logouts
                    </button>
                ) : (
                    <Link to="/login" className="hover:text-blue-400">
                        Login
                    </Link>
                )}
            </div>
            <Link to="/submissions" className="hover:text-blue-400">
                My Submissions
            </Link>

            {isAdmin() && (
                <Link to="/admin/problems" className="hover:text-yellow-400">
                    Admin
                </Link>
            )}
        </div>

    );
}



























