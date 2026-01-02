import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProblemDetail from "./pages/ProblemDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Leaderboard from "./pages/Leaderboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Submissions from "./pages/Submission";
import AdminRoute from "./components/AdminRoute";
import AdminProblems from "./pages/admin/AdminProblems";
import CreateProblem from "./pages/admin/CreateProblem";
import EditProblem from "./pages/admin/EditProblems";
import Testcases from "./pages/admin/Testcases";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>

        <Route 
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route 
          path="/problems/:id"
          element= {
            <ProtectedRoute>
              <Layout>
                <ProblemDetail />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route 
          path="/leaderboard/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <Leaderboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route 
          path="/submissions"
          element={
            <ProtectedRoute>
              <Layout>
                <Submissions />
              </Layout>
            </ProtectedRoute>
          }
        />

      <Route
        path="/admin/problems"
        element={
          <AdminRoute>
            <Layout>
          <AdminProblems />
            </Layout>
         </AdminRoute>
        }
      />

        <Route
          path="/admin/problems/create"
          element={
          <AdminRoute>
            <Layout>
              <CreateProblem />
             </Layout>
          </AdminRoute>
          }
        />

        <Route
         path="/admin/problems/:id/edit"
          element={
          <AdminRoute>
            <Layout>
              <EditProblem />
            </Layout>
          </AdminRoute>
          }
        />

        <Route
          path="/admin/problems/:id/testcases"
          element={
          <AdminRoute>
            <Layout>
              <Testcases />
            </Layout>
          </AdminRoute>
          }
        />




      </Routes>
    </BrowserRouter>
  );
}































