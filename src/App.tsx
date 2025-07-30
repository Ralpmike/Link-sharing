import { Routes, Route } from "react-router";

import Login from "./pages/login";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
        path="dashboard"
      />
    </Routes>
  );
}

export default App;
