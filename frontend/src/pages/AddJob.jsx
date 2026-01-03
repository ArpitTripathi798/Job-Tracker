import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function AddJob() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    company: "",
    role: "",
    location: "",
    status: "Applied",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔥 IMPORTANT

    try {
      const res = await axios.post("/jobs", job);
      console.log("JOB SAVED:", res.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("ADD JOB ERROR:", err);
      alert("Job add failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-96"
      >
        <h2 className="text-xl font-bold mb-4">Add Job</h2>

        <input
          name="company"
          className="w-full border p-2 rounded mb-2"
          placeholder="Company"
          onChange={handleChange}
          required
        />

        <input
          name="role"
          className="w-full border p-2 rounded mb-2"
          placeholder="Role"
          onChange={handleChange}
          required
        />

        <input
          name="location"
          className="w-full border p-2 rounded mb-2"
          placeholder="Location"
          onChange={handleChange}
          required
        />

        <select
          name="status"
          className="w-full border p-2 rounded mb-4"
          onChange={handleChange}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}


