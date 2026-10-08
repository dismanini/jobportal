
import React, { useEffect, useState } from "react";
import { getJobs, deleteJob } from "../services/api";
import "./JobList.css";
import { useNavigate } from "react-router-dom";

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

const JobList: React.FC = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Search & filter states
  const [search, setSearch] = useState<string>("");
  const [jobType, setJobType] = useState<string>("All");
  const [location, setLocation] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getJobs();

      console.log("Jobs API Response:", response.data);

      setJobs(response.data.jobs || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // Delete job
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteJob(id);

      // Remove deleted job from screen
      setJobs((previousJobs) =>
        previousJobs.filter((job) => job.id !== id)
      );
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete job.");
    }
  };

  const handleAddJob = () => {
    window.location.href = "/addjob";
  };

  // Get unique locations
  const locations = [
    "All",
    ...Array.from(
      new Set(
        jobs
          .map((job) => job.location)
          .filter((location): location is string => Boolean(location))
      )
    ),
  ];

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      job.title.toLowerCase().includes(searchValue) ||
      job.company.toLowerCase().includes(searchValue) ||
      job.location.toLowerCase().includes(searchValue) ||
      (job.skills || "").toLowerCase().includes(searchValue);

    const matchesJobType =
      jobType === "All" ||
      (job.job_type || "").toLowerCase() === jobType.toLowerCase();

    const matchesLocation =
      location === "All" ||
      job.location.toLowerCase() === location.toLowerCase();

    const matchesStatus =
      status === "All" ||
      job.status.toLowerCase() === status.toLowerCase();

    return (
      matchesSearch &&
      matchesJobType &&
      matchesLocation &&
      matchesStatus
    );
  });

  // Clear all filters
  const handleClearFilters = () => {
    setSearch("");
    setJobType("All");
    setLocation("All");
    setStatus("All");
  };

  return (
    <div className="job-list-page">

      {/* Header */}
      <div className="job-list-header">

        <div>
          <h1>Job Management</h1>
          <p>Manage all your job postings</p>
        </div>

        <button
          className="add-job-btn"
          onClick={handleAddJob}
        >
          + Add New Job
        </button>

      </div>

      {/* Error */}
      {error && (
        <div className="job-error">
          {error}
        </div>
      )}

      {/* Search & Filters */}
      {!loading && jobs.length > 0 && (
        <div className="job-filters">

          {/* Search */}
          <input
            type="text"
            className="job-search"
            placeholder="Search by title, company, location or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Job Type */}
          <select
            className="job-filter-select"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="All">All Job Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>

          {/* Location */}
          <select
            className="job-filter-select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            {locations.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Locations" : item}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            className="job-filter-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Clear */}
          <button
            type="button"
            className="clear-filter-btn"
            onClick={handleClearFilters}
          >
            Clear
          </button>

        </div>
      )}

      {/* Result Count */}
      {!loading && jobs.length > 0 && (
        <div className="job-result-count">
          Showing <strong>{filteredJobs.length}</strong> of{" "}
          <strong>{jobs.length}</strong> jobs
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="job-loading">
          Loading jobs...
        </div>

      ) : jobs.length === 0 ? (

        <div className="no-jobs">
          <h3>No Jobs Found</h3>

          <p>
            Create your first job posting.
          </p>

          <button
            className="add-job-btn"
            onClick={handleAddJob}
          >
            + Add Job
          </button>
        </div>

      ) : filteredJobs.length === 0 ? (

        /* No Search Results */
        <div className="no-jobs">
          <h3>No Matching Jobs Found</h3>

          <p>
            Try changing your search or filters.
          </p>

          <button
            className="clear-filter-btn"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>

      ) : (

        /* Job Table */
        <div className="job-table-wrapper">

          <table className="job-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Job Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Job Type</th>
                <th>Experience</th>
                <th>Skills</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredJobs.map((job) => (

                <tr key={job.id}>

                  <td>
                    {job.id}
                  </td>

                  <td className="job-title-cell">
                    {job.title}
                  </td>

                  <td className="company-cell">
                    {job.company}
                  </td>

                  <td>
                    {job.location}
                  </td>

                  <td>
                    {job.salary || "Not specified"}
                  </td>

                  <td>
                    {job.job_type || "Not specified"}
                  </td>

                  <td>
                    {job.experience || "Not specified"}
                  </td>

                  <td className="skills-cell">
                    {job.skills || "Not specified"}
                  </td>

                  <td>
                    <span
                      className={`status-badge ${
                        job.status === "active"
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="actions-cell">

                    {/* View */}
                    <button
                      type="button"
                      className="view-btn"
                      onClick={() =>
                        navigate(`/job-details/${job.id}`)
                      }
                    >
                      View Details
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() =>
                        navigate(`/edit-job/${job.id}`)
                      }
                    >
                      Edit
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(job.id)
                      }
                    >
                      Delete
                    </button>

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

export default JobList;

