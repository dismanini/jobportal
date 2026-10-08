import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./JobSeekerDashboard.css";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string | null;
  job_type: string | null;
}

interface Application {
  id: number;
  candidate_name: string;
  job_title: string | null;
  company: string | null;
  status: string;
}

const JobSeekerDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const [jobsResponse, applicationsResponse] =
        await Promise.all([
          axios.get("http://localhost:5000/api/jobs"),
          axios.get("http://localhost:5000/api/applications"),
        ]);

      setJobs(jobsResponse.data.jobs || []);
      setApplications(
        applicationsResponse.data.applications || []
      );
    } catch (error) {
      console.error(
        "Dashboard loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const activeJobs = jobs.filter(
    (job) => job.id
  );

  const pendingApplications = applications.filter(
    (application) => application.status === "pending"
  );

  const shortlistedApplications = applications.filter(
    (application) =>
      application.status === "shortlisted"
  );

  if (loading) {
    return (
      <div className="job-seeker-dashboard">
        <div className="dashboard-loading">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="job-seeker-dashboard">

      {/* Header */}

      <div className="dashboard-header">

        <div>
          <h1>Job Seeker Dashboard</h1>
          <p>
            Find jobs and manage your applications
          </p>
        </div>

        <button
          className="browse-jobs-btn"
          onClick={() => navigate("/job-list")}
        >
          Browse Jobs
        </button>

      </div>

      {/* Statistics */}

      <div className="dashboard-stats">

        <div className="stat-card">
          <div className="stat-content">
            <span>Available Jobs</span>
            <strong>{activeJobs.length}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <span>My Applications</span>
            <strong>{applications.length}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <span>Pending</span>
            <strong>
              {pendingApplications.length}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <span>Shortlisted</span>
            <strong>
              {shortlistedApplications.length}
            </strong>
          </div>
        </div>

      </div>

      {/* Quick Actions */}

      <div className="dashboard-section">

        <h2>Quick Actions</h2>

        <div className="quick-actions">

          <button
            onClick={() => navigate("/joblist")}
          >
            Browse Jobs
          </button>

          <button
            onClick={() => navigate("/applications")}
          >
            My Applications
          </button>

          <button
            onClick={() => navigate("/profile")}
          >
            My Profile
          </button>

          <button
            onClick={() => navigate("/my-resume")}
          >
            My Resume
          </button>

        </div>

      </div>

      {/* Recent Jobs */}

      <div className="dashboard-section">

        <div className="section-header">
          <h2>Recent Jobs</h2>

          <button
            onClick={() => navigate("/joblist")}
          >
            View All Jobs
          </button>
        </div>

        <div className="recent-jobs">

          {jobs.slice(0, 5).map((job) => (
            <div
              className="recent-job-card"
              key={job.id}
            >

              <div>
                <h3>{job.title}</h3>

                <p>{job.company}</p>

                <span>
                  {job.location}
                </span>
              </div>

              <button
                onClick={() =>
                  navigate(
                    `/job-details/${job.id}`
                  )
                }
              >
                View Job
              </button>

            </div>
          ))}

        </div>

      </div>

      {/* Recent Applications */}

      <div className="dashboard-section">

        <div className="section-header">

          <h2>Recent Applications</h2>

          <button
            onClick={() =>
              navigate("/applications")
            }
          >
            View All
          </button>

        </div>

        {applications.length === 0 ? (

          <div className="empty-dashboard">
            <p>
              You have not submitted any
              applications yet.
            </p>

            <button
              onClick={() =>
                navigate("/joblist")
              }
            >
              Find a Job
            </button>
          </div>

        ) : (

          <div className="application-preview">

            {applications
              .slice(0, 5)
              .map((application) => (

                <div
                  className="application-preview-row"
                  key={application.id}
                >

                  <div>
                    <strong>
                      {application.job_title ||
                        "Unknown Job"}
                    </strong>

                    <span>
                      {application.company ||
                        "Unknown Company"}
                    </span>
                  </div>

                  <span
                    className={`dashboard-status ${application.status}`}
                  >
                    {application.status}
                  </span>

                </div>

              ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default JobSeekerDashboard;