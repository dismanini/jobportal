import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobs, updateJob } from "../services/api";
import "./AddJob.css";

interface JobForm {
  title: string;
  company: string;
  location: string;
  salary: string;
  job_type: string;
  experience: string;
  description: string;
  skills: string;
  status: string;
}

const EditJob = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<JobForm>({
    title: "",
    company: "",
    location: "",
    salary: "",
    job_type: "Full Time",
    experience: "",
    description: "",
    skills: "",
    status: "active",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load existing job
  useEffect(() => {
    const loadJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getJobs();

        const jobs = response.data.jobs || [];

        const job = jobs.find(
          (item: any) => Number(item.id) === Number(id)
        );

        if (!job) {
          setError("Job not found");
          return;
        }

        setFormData({
          title: job.title || "",
          company: job.company || "",
          location: job.location || "",
          salary: job.salary || "",
          job_type: job.job_type || "Full Time",
          experience: job.experience || "",
          description: job.description || "",
          skills: job.skills || "",
          status: job.status || "active",
        });
      } catch (error) {
        console.error("Error loading job:", error);
        setError("Failed to load job");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadJob();
    }
  }, [id]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Update job
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!id) {
      alert("Job ID is missing");
      return;
    }

    if (
      !formData.title.trim() ||
      !formData.company.trim() ||
      !formData.location.trim() ||
      !formData.description.trim()
    ) {
      alert(
        "Please fill in Title, Company, Location and Description"
      );
      return;
    }

    try {
      setSaving(true);

      console.log("Updating job ID:", id);
      console.log("Form data:", formData);

      const response = await updateJob(
        Number(id),
        formData
      );

      console.log(
        "Update response:",
        response.data
      );

      if (response.data.success) {
        alert("Job updated successfully!");

        navigate("/joblist");
      } else {
        alert(
          response.data.message ||
          "Failed to update job"
        );
      }
    } catch (error: any) {
      console.error(
        "Update job error:",
        error
      );

      console.error(
        "Server response:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to update job"
      );
    } finally {
      setSaving(false);
    }
  };

  // Cancel
  const handleCancel = () => {
    navigate("/jobs");
  };

  // Loading
  if (loading) {
    return (
      <div className="add-job-page">
        <div className="add-job-container">
          <h2>Loading job...</h2>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="add-job-page">
        <div className="add-job-container">
          <h2>{error}</h2>

          <button
            type="button"
            onClick={handleCancel}
            className="cancel-btn"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="add-job-page">
      <div className="add-job-container">

        {/* Header */}
        <div className="add-job-header">
          <div>
            <h1>Edit Job</h1>
            <p>
              Update the job posting details
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          className="add-job-form"
          onSubmit={handleSubmit}
        >

          {/* Job Title */}
          <div className="form-group">
            <label htmlFor="title">
              Job Title *
            </label>

            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter job title"
              required
            />
          </div>

          {/* Company */}
          <div className="form-group">
            <label htmlFor="company">
              Company *
            </label>

            <input
              id="company"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
              required
            />
          </div>

          {/* Location */}
          <div className="form-group">
            <label htmlFor="location">
              Location *
            </label>

            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
            />
          </div>

          {/* Salary */}
          <div className="form-group">
            <label htmlFor="salary">
              Salary
            </label>

            <input
              id="salary"
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Example: 3 LPA"
            />
          </div>

          {/* Job Type */}
          <div className="form-group">
            <label htmlFor="job_type">
              Job Type
            </label>

            <select
              id="job_type"
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
            >
              <option value="Full Time">
                Full Time
              </option>

              <option value="Part Time">
                Part Time
              </option>

              <option value="Contract">
                Contract
              </option>

              <option value="Internship">
                Internship
              </option>
            </select>
          </div>

          {/* Experience */}
          <div className="form-group">
            <label htmlFor="experience">
              Experience
            </label>

            <input
              id="experience"
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Example: 2-4 Years"
            />
          </div>

          {/* Skills */}
          <div className="form-group">
            <label htmlFor="skills">
              Skills
            </label>

            <input
              id="skills"
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Example: React, Node.js, MySQL"
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">
              Description *
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter job description"
              rows={6}
              required
            />
          </div>

          {/* Status */}
          <div className="form-group">
            <label htmlFor="status">
              Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
            </select>
          </div>

          {/* Buttons */}
          <div className="form-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-btn"
              disabled={saving}
            >
              {saving
                ? "Updating..."
                : "Update Job"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditJob;