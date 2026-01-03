import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Link } from "react-router-dom";

/* ================= TIME AGO HELPER ================= */
const timeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return "Just now";

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} days ago`;

  return past.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get("/jobs");
      setJobs(res.data);
    };
    fetchJobs();
  }, []);

  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((job) => job.status === filter);

  const statusStyles = {
    Applied: "bg-blue-100 text-blue-700",
    Interview: "bg-yellow-100 text-yellow-700",
    Offer: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const stats = {
    Applied: jobs.filter((j) => j.status === "Applied").length,
    Interview: jobs.filter((j) => j.status === "Interview").length,
    Offer: jobs.filter((j) => j.status === "Offer").length,
    Rejected: jobs.filter((j) => j.status === "Rejected").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Job Tracker 
            </h1>
            <p className="text-gray-500 mt-1">
              Track, filter & manage your applications
            </p>
          </div>

          <Link
            to="/add-job"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
          >
            + Add Job
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {Object.entries(stats).map(([key, value]) => (
            <div
              key={key}
              className="rounded-2xl p-6 text-white shadow-xl transform hover:-translate-y-1 transition"
              style={{
                background:
                  key === "Applied"
                    ? "linear-gradient(135deg,#3b82f6,#60a5fa)"
                    : key === "Interview"
                    ? "linear-gradient(135deg,#facc15,#fde047)"
                    : key === "Offer"
                    ? "linear-gradient(135deg,#22c55e,#4ade80)"
                    : "linear-gradient(135deg,#ef4444,#f87171)",
              }}
            >
              <p className="text-sm opacity-90">{key}</p>
              <h2 className="text-4xl font-bold mt-2">{value}</h2>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {["All", "Applied", "Interview", "Offer", "Rejected"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter === s
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Job Cards */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow">
            <p className="text-gray-500">No jobs found.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {job.role}
                    </h3>
                    <p className="text-gray-600 mt-1">{job.company}</p>

                    {/* Location + Applied Time */}
                    <p className="text-sm text-gray-400 mt-2 flex items-center gap-4">
                      <span>📍 {job.location}</span>
                      <span
                        title={new Date(job.createdAt).toLocaleString()}
                        className="flex items-center gap-1"
                      >
                        🕒 {timeAgo(job.createdAt)}
                      </span>
                    </p>
                  </div>

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${statusStyles[job.status]}`}
                  >
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



