
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ApplyJob.css";

const ApplyJob: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidateName, setCandidateName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Resume file
  const [resume, setResume] = useState<File | null>(null);

  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResumeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!candidateName || !email) {
      alert("Please enter candidate name and email.");
      return;
    }

    try {
      setLoading(true);

      // Create FormData for file upload
      const formData = new FormData();

      formData.append("job_id", String(Number(id)));
      formData.append("candidate_name", candidateName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("cover_letter", coverLetter);

      // Add resume file if selected
      if (resume) {
        formData.append("resume", resume);
      }

      const response = await axios.post(
        "http://localhost:5000/api/applications",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Application Response:", response.data);

      alert("Application submitted successfully!");

      navigate("/applications");

    } catch (error) {
      console.error("Application error:", error);
      alert("Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-job-page">

      <div className="apply-job-container">

        <div className="apply-job-header">
          <h1>Apply for Job</h1>

          <p>
            Please fill in your details to submit your application.
          </p>
        </div>

        <form
          className="application-form"
          onSubmit={handleSubmit}
        >

          {/* Candidate Name */}
          <div className="form-group">
            <label>
              Candidate Name *
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={candidateName}
              onChange={(e) =>
                setCandidateName(e.target.value)
              }
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>
              Email *
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>
              Phone
            </label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />
          </div>

          {/* Resume */}
          <div className="form-group">
            <label>
              Resume
            </label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
            />

            {resume && (
              <small>
                Selected file: <strong>{resume.name}</strong>
              </small>
            )}

            <small>
              Accepted formats: PDF, DOC, DOCX
            </small>
          </div>

          {/* Cover Letter */}
          <div className="form-group">
            <label>
              Cover Letter
            </label>

            <textarea
              placeholder="Write your cover letter..."
              value={coverLetter}
              onChange={(e) =>
                setCoverLetter(e.target.value)
              }
              rows={6}
            />
          </div>

          {/* Buttons */}
          <div className="form-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Submit Application"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ApplyJob;
