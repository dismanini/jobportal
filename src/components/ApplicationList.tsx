import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ApplicationList.css";

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
}

const ApplicationList: React.FC = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/applications"
      );

      console.log("Applications API Response:", response.data);

      setApplications(response.data.applications || []);
    } catch (err) {
      console.error("Error loading applications:", err);
      setError("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/applications/${id}`
      );

      setApplications((previousApplications) =>
        previousApplications.filter(
          (application) => application.id !== id
        )
      );

      alert("Application deleted successfully.");
    } catch (err) {
      console.error("Delete application error:", err);
      alert("Failed to delete application.");
    }
  };

  return (
    <div className="application-list-page">

      <div className="application-list-header">
        <div>
          <h1>Application Management</h1>
          <p>Manage all job applications</p>
        </div>

        <button
          className="back-job-btn"
          onClick={() => navigate("/joblist")}
        >
          Back to Jobs
        </button>
      </div>

      {error && (
        <div className="application-error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="application-loading">
          Loading applications...
        </div>
      ) : applications.length === 0 ? (
        <div className="no-applications">
          <h3>No Applications Submitted</h3>

          <p>
            No job applications are available yet.
          </p>

          <button
            className="back-job-btn"
            onClick={() => navigate("/joblist")}
          >
            View Jobs
          </button>
        </div>
      ) : (
        <div className="application-table-wrapper">

          <table className="application-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Candidate</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Job</th>
                <th>Company</th>
                <th>Status</th>
                <th>Applied Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {applications.map((application) => (
                <tr key={application.id}>

                  <td>
                    {application.id}
                  </td>

                  <td className="candidate-name">
                    {application.candidate_name}
                  </td>

                  <td>
                    {application.email}
                  </td>

                  <td>
                    {application.phone || "Not provided"}
                  </td>

                  <td>
                    {application.job_title || "Unknown Job"}
                  </td>

                  <td>
                    {application.company || "Unknown Company"}
                  </td>

                  <td>
                    <span
                      className={`application-status ${application.status}`}
                    >
                      {application.status}
                    </span>
                  </td>

                  <td>
                    {new Date(
                      application.applied_date
                    ).toLocaleDateString()}
                  </td>

                  <td className="application-actions">

                    <button
                      className="application-view-btn"
                      onClick={() =>
                        navigate(
                          `/application-details/${application.id}`
                        )
                      }
                    >
                      View
                    </button>

                    <button
                      className="application-delete-btn"
                      onClick={() =>
                        handleDelete(application.id)
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

export default ApplicationList;