import Job from "../models/Job.js";

export const addJob = async (req, res) => {
  try {
    const job = await Job.create({
      company: req.body.company,
      role: req.body.role,
      location: req.body.location,
      status: req.body.status,
      user: req.user.id,
    });

    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: "Job add failed" });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};
