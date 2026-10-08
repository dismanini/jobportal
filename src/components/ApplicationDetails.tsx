import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ApplicationDetails.css";

interface Application {
  id: number;
  job_id: number;
  candidate_name: string;
  email: string;
  phone: string | null;
  resume: string | null;
  cover_letter: string | null;
  status: string;
  applied_date: string;
  job_title: string | null;
  company: string | null;
  location?: string | null;
}

const ApplicationDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] =
    useState<Application | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadApplication = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `http://localhost:5000/api/applications/${id}`
      );

      console.log(
        "Application Details:",
        response.data
      );

      setApplication(response.data.application);
    } catch (err) {
      console.error(
        "Error loading application:",
        err
      );

      setError("Failed to load application.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplication();
  }, [id]);

  const handleStatusChange = async (
    newStatus: string
  ) => {
    if (!application) {
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/applications/${application.id}/status`,
        {
          status: newStatus,
        }
      );

      setApplication({
        ...application,
        status: newStatus,
      });

      alert("Application status updated successfully.");
    } catch (err) {
      console.error(
        "Status update error:",
        err
      );

      alert("Failed to update application status.");
    }
  };

  const handleDelete = async () => {
    if (!application) {
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/applications/${application.id}`
      );

      alert("Application deleted successfully.");

      navigate("/applications");
    } catch (err) {
      console.error(
        "Delete application error:",
        err
      );

      alert("Failed to delete application.");
    }
  };

  if (loading) {
    return (
      <div className="application-details-page">
        <div className="application-details-loading">
          Loading application details...
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="application-details-page">
        <div className="application-details-error">
          <h2>Application Not Found</h2>
          <p>
            {error || "This application does not exist."}
          </p>

          <button
            onClick={() => navigate("/applications")}
            className="back-applications-btn"
          >
            Back to Applications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="application-details-page">

      <div className="application-details-header">

        <div>
          <h1>Application Details</h1>

          <p>
            View candidate application information
          </p>
        </div>

        <button
          className="back-applications-btn"
          onClick={() => navigate("/applications")}
        >
          Back to Applications
        </button>

      </div>

      <div className="application-details-container">

        {/* Candidate Information */}

        <div className="details-card">

          <h2>Candidate Information</h2>

          <div className="details-grid">

            <div className="detail-item">
              <span className="detail-label">
                Candidate Name
              </span>

              <strong>
                {application.candidate_name}
              </strong>
            </div>

            <div className="detail-item">
              <span className="detail-label">
                Email
              </span>

              <strong>
                {application.email}
              </strong>
            </div>

            <div className="detail-item">
              <span className="detail-label">
                Phone
              </span>

              <strong>
                {application.phone || "Not provided"}
              </strong>
            </div>

            <div className="detail-item">
              <span className="detail-label">
                Application ID
              </span>

              <strong>
                #{application.id}
              </strong>
            </div>

          </div>

        </div>

        {/* Job Information */}

        <div className="details-card">

          <h2>Job Information</h2>

          <div className="details-grid">

            <div className="detail-item">
              <span className="detail-label">
                Job Title
              </span>

              <strong>
                {application.job_title || "Unknown Job"}
              </strong>
            </div>

            <div className="detail-item">
              <span className="detail-label">
                Company
              </span>

              <strong>
                {application.company || "Unknown Company"}
              </strong>
            </div>

            <div className="detail-item">
              <span className="detail-label">
                Job ID
              </span>

              <strong>
                #{application.job_id}
              </strong>
            </div>

            <div className="detail-item">
              <span className="detail-label">
                Applied Date
              </span>

              <strong>
                {new Date(
                  application.applied_date
                ).toLocaleString()}
              </strong>
            </div>

          </div>

        </div>

        {/* Resume */}

        <div className="details-card">

          <h2>Resume</h2>

          {application.resume ? (
            <div className="resume-box">
              <p>
                {application.resume}
              </p>
            </div>
          ) : (
            <p className="not-provided">
              No resume provided.
            </p>
          )}

        </div>

        {/* Cover Letter */}

        <div className="details-card">

          <h2>Cover Letter</h2>

          {application.cover_letter ? (
            <div className="cover-letter-box">
              {application.cover_letter}
            </div>
          ) : (
            <p className="not-provided">
              No cover letter provided.
            </p>
          )}

        </div>

        {/* Application Status */}

        <div className="details-card">

          <h2>Application Status</h2>

          <div className="status-section">

            <div>
              <span className="detail-label">
                Current Status
              </span>

              <span
                className={`application-status-large ${application.status}`}
              >
                {application.status}
              </span>
            </div>

            <div className="status-controls">

              <label>
                Change Status
              </label>

              <select
                value={application.status}
                onChange={(e) =>
                  handleStatusChange(e.target.value)
                }
              >
                <option value="pending">
                  Pending
                </option>

                <option value="shortlisted">
                  Shortlisted
                </option>

                <option value="rejected">
                  Rejected
                </option>

                <option value="hired">
                  Hired
                </option>
              </select>

            </div>

          </div>

        </div>

        {/* Actions */}

        <div className="application-detail-actions">

          <button
            className="back-btn"
            onClick={() => navigate("/applications")}
          >
            Back to Applications
          </button>

          <button
            className="delete-application-btn"
            onClick={handleDelete}
          >
            Delete Application
          </button>

        </div>

      </div>

    </div>
  );
};

export default ApplicationDetails;