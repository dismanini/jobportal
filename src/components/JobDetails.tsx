import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobs, deleteJob } from "../services/api";
import "./JobDetails.css";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string | null;
  job_type: string | null;
  experience: string | null;
  description: string | null;
  skills: string | null;
  status: string;
  created_at: string;
}

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load job details
  useEffect(() => {
    const loadJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getJobs();

        const jobs: Job[] = response.data.jobs || [];

        const selectedJob = jobs.find(
          (item) => Number(item.id) === Number(id)
        );

        if (!selectedJob) {
          setError("Job not found");
          return;
        }

        setJob(selectedJob);
      } catch (error) {
        console.error("Error loading job:", error);
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadJob();
    }
  }, [id]);

  // Delete job
  const handleDelete = async () => {
    if (!job) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${job.title}"?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteJob(job.id);

      alert("Job deleted successfully!");

      navigate("/joblist");
    } catch (error) {
      console.error("Delete job error:", error);

      alert("Failed to delete job");
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="job-details-page">
        <div className="job-details-container">
          <h2>Loading job details...</h2>
        </div>
      </div>
    );
  }

  // Error
  if (error || !job) {
    return (
      <div className="job-details-page">
        <div className="job-details-container">
          <div className="error-box">
            <h2>{error || "Job not found"}</h2>

            <button
              type="button"
              className="back-btn"
              onClick={() => navigate("/joblist")}
            >
              Back to Jobs
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="job-details-page">

      <div className="job-details-container">

        {/* Header */}
        <div className="job-details-header">

          <div>
            <button
              type="button"
              className="back-link"
              onClick={() => navigate("/joblist")}
            >
              ← Back to Jobs
            </button>

            <h1>{job.title}</h1>

            <p className="company-name">
              {job.company}
            </p>
          </div>

          <div
            className={`status-badge ${
              job.status === "active"
                ? "active"
                : "inactive"
            }`}
          >
            {job.status}
          </div>

        </div>

        {/* Job Information */}
        <div className="job-info-grid">

          <div className="info-card">
            <span className="info-label">
              Location
            </span>

            <strong>
              {job.location || "Not specified"}
            </strong>
          </div>

          <div className="info-card">
            <span className="info-label">
              Salary
            </span>

            <strong>
              {job.salary || "Not specified"}
            </strong>
          </div>

          <div className="info-card">
            <span className="info-label">
              Job Type
            </span>

            <strong>
              {job.job_type || "Not specified"}
            </strong>
          </div>

          <div className="info-card">
            <span className="info-label">
              Experience
            </span>

            <strong>
              {job.experience || "Not specified"}
            </strong>
          </div>

        </div>

        {/* Description */}
        <div className="details-section">

          <h2>Job Description</h2>

          <p className="description">
            {job.description || "No description available."}
          </p>

        </div>

        {/* Skills */}
        <div className="details-section">

          <h2>Required Skills</h2>

          {job.skills ? (
            <div className="skills-container">

              {job.skills
                .split(",")
                .map((skill, index) => (
                  <span
                    className="skill-tag"
                    key={index}
                  >
                    {skill.trim()}
                  </span>
                ))}

            </div>
          ) : (
            <p>No skills specified.</p>
          )}

        </div>

        {/* Posted Date */}
        <div className="details-section">

          <h2>Job Information</h2>

          <p>
            <strong>Job ID:</strong>{" "}
            {job.id}
          </p>

          <p>
            <strong>Posted:</strong>{" "}
            {job.created_at
              ? new Date(
                  job.created_at
                ).toLocaleDateString()
              : "Not available"}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {job.status}
          </p>

        </div>

        {/* Actions */}
        <div className="job-actions">
<button
  type="button"
  onClick={() => navigate(`/apply-job/${job.id}`)}
>
  Apply Now
</button>
          <button
            type="button"
            className="edit-job-btn"
            onClick={() =>
              navigate(`/edit-job/${job.id}`)
            }
          >
            Edit Job
          </button>

          <button
            type="button"
            className="delete-job-btn"
            onClick={handleDelete}
          >
            Delete Job
          </button>

          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/joblist")}
          >
            Back to Jobs
          </button>

        </div>

      </div>

    </div>
  );
};

export default JobDetails;