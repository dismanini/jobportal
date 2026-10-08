import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminJobs.css";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  job_type: string;
  experience: string;
  status: string;
  created_at: string;
}

const AdminJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/jobs"
      );

      if (response.data.success) {
        setJobs(response.data.jobs || []);
      }
    } catch (error) {
      console.error("Failed to load jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/jobs/${id}`
      );

      if (response.data.success) {
        setJobs((prevJobs) =>
          prevJobs.filter((job) => job.id !== id)
        );
      }
    } catch (error) {
      console.error("Delete job error:", error);
      alert("Failed to delete job.");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    return (
      job.title?.toLowerCase().includes(searchText) ||
      job.company?.toLowerCase().includes(searchText) ||
      job.location?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="admin-jobs-page">

      <div className="admin-jobs-header">
        <div>
          <h1>Manage Jobs</h1>
          <p>Manage all jobs posted on the job portal.</p>
        </div>

        <button
          className="add-job-btn"
          onClick={() => navigate("/addjob")}
        >
          + Add New Job
        </button>
      </div>

      <div className="jobs-search-box">
        <input
          type="text"
          placeholder="Search by job title, company or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="jobs-loading">
          Loading jobs...
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="no-jobs">
          No jobs found.
        </div>
      ) : (
        <div className="admin-jobs-table-wrapper">

          <table className="admin-jobs-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Job Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Job Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job.id}>

                  <td>{job.id}</td>

                  <td>
                    <strong>{job.title}</strong>
                  </td>

                  <td>{job.company}</td>

                  <td>{job.location}</td>

                  <td>{job.job_type}</td>

                  <td>
                    <span
                      className={`job-status ${job.status}`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td>
                    <div className="job-actions">

                      <button
                        className="view-btn"
                        onClick={() =>
                          navigate(`/job-details/${job.id}`)
                        }
                      >
                        View
                      </button>

                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(`/edit-job/${job.id}`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(job.id)
                        }
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default AdminJobs;