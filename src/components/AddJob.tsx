import React, { useState } from "react";
import { createJob } from "../services/api";
import "./AddJob.css";
import { useNavigate } from "react-router-dom";

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

const AddJob: React.FC = () => {
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

  const [loading, setLoading] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");

  const [error, setError] = useState<string>("");


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


  // Submit form
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setMessage("");
    setError("");


    // Validation
    if (!formData.title.trim()) {
      setError("Please enter job title.");
      return;
    }

    if (!formData.company.trim()) {
      setError("Please enter company name.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Please enter location.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please enter job description.");
      return;
    }


    try {

      setLoading(true);

      /*
        Data sent to backend:

        {
          title,
          company,
          location,
          salary,
          job_type,
          experience,
          description,
          skills,
          status
        }
      */

      // const response = await createJob(formData);

      // console.log(
      //   "Create Job Response:",
      //   response.data
      // );


      // setMessage(
      //   "Job added successfully!"
      // );

const response = await createJob(formData);

console.log(
  "Create Job Response:",
  response.data
);

if (response.data.success) {
  alert("Job added successfully!");

  navigate("/joblist");
}



      // Reset form
      setFormData({
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


    } catch (err) {

      console.error(
        "Error creating job:",
        err
      );

      setError(
        "Failed to add job. Please check your backend server."
      );

    } finally {

      setLoading(false);

    }

  };


  // Cancel / Back
  const handleCancel = () => {

    window.location.href = "/jobs";

  };


  return (

    <div className="add-job-page">

      {/* Header */}
      <div className="add-job-header">

        <div>

          <h1>
            Add New Job
          </h1>

          <p>
            Create a new job posting
          </p>

        </div>

        <button
          type="button"
          className="back-btn"
          onClick={handleCancel}
        >
          ← Back to Jobs
        </button>

      </div>


      {/* Form Card */}
      <div className="add-job-card">

        <form onSubmit={handleSubmit}>

          {/* Success */}
          {message && (
            <div className="success-message">
              {message}
            </div>
          )}


          {/* Error */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}


          {/* Job Title */}
          <div className="form-group">

            <label htmlFor="title">
              Job Title <span>*</span>
            </label>

            <input
              type="text"
              id="title"
              name="title"
              placeholder="Example: Java Developer"
              value={formData.title}
              onChange={handleChange}
            />

          </div>


          {/* Company */}
          <div className="form-group">

            <label htmlFor="company">
              Company <span>*</span>
            </label>

            <input
              type="text"
              id="company"
              name="company"
              placeholder="Example: Dhal Information System Pvt Ltd"
              value={formData.company}
              onChange={handleChange}
            />

          </div>


          {/* Location */}
          <div className="form-group">

            <label htmlFor="location">
              Location <span>*</span>
            </label>

            <input
              type="text"
              id="location"
              name="location"
              placeholder="Example: Bhubaneswar"
              value={formData.location}
              onChange={handleChange}
            />

          </div>


          {/* Salary */}
          <div className="form-group">

            <label htmlFor="salary">
              Salary
            </label>

            <input
              type="text"
              id="salary"
              name="salary"
              placeholder="Example: 3LPA"
              value={formData.salary}
              onChange={handleChange}
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

              <option value="Remote">
                Remote
              </option>

            </select>

          </div>


          {/* Experience */}
          <div className="form-group">

            <label htmlFor="experience">
              Experience
            </label>

            <input
              type="text"
              id="experience"
              name="experience"
              placeholder="Example: 2-4 Years"
              value={formData.experience}
              onChange={handleChange}
            />

          </div>


          {/* Skills */}
          <div className="form-group">

            <label htmlFor="skills">
              Skills
            </label>

            <input
              type="text"
              id="skills"
              name="skills"
              placeholder="Example: Java, Spring Boot, MySQL"
              value={formData.skills}
              onChange={handleChange}
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


          {/* Description */}
          <div className="form-group">

            <label htmlFor="description">
              Job Description <span>*</span>
            </label>

            <textarea
              id="description"
              name="description"
              rows={7}
              placeholder="Enter detailed job description..."
              value={formData.description}
              onChange={handleChange}
            />

          </div>


          {/* Buttons */}
          <div className="form-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading
                ? "Adding Job..."
                : "Add Job"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );
};

export default AddJob;