import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* App */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-job" element={<AddJob />} />
      </Routes>
    </BrowserRouter>
  );
}

