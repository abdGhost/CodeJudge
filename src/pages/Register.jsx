import { useState } from "react";
import {registerUser} from "../api/auth";
import { useNavigate } from "react-router-dom";


export default async function Register(){
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e)=> {
    e.preventDefault();
    setError("");
 

  try{
    await registerUser(username, email, password);
    navigate("/login");
  }catch (err){
    setError(err.response?.data?.details || "Registration failed");
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-2">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input 
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-3"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          required
        />

        <input 
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          required
        />

        < input 
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register
        </button>

        <p className="mt-3 text-sm text-center">
          Already have an account? {" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}



































