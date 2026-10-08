import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

interface Statistics {
  totalJobs: number;
  totalApplications: number;
  totalUsers: number;
  pendingApplications: number;
  shortlistedApplications: number;
}

interface RecentJob {
  id: number;
  title: string;
  company: string;
  location: string;
  job_type: string;
  created_at: string;
}

interface RecentApplication {
  id: number;
  candidate_name: string;
  email: string;
  status: string;
  applied_date: string;
  job_title: string;
  company: string;
}

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState<Statistics>({
    totalJobs: 0,
    totalApplications: 0,
    totalUsers: 0,
    pendingApplications: 0,
    shortlistedApplications: 0,
  });

  const [recentJobs, setRecentJobs] = useState<RecentJob[]>([]);
  const [recentApplications, setRecentApplications] = useState<
    RecentApplication[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/admin/dashboard"
      );

      if (response.data.success) {
        setStatistics(response.data.statistics);
        setRecentJobs(response.data.recentJobs || []);
        setRecentApplications(response.data.recentApplications || []);
      }
    } catch (error) {
      console.error("Admin dashboard error:", error);
      setError("Failed to load admin dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="admin-loading">
          Loading Admin Dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="admin-error">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">

      {/* HEADER */}
      <div className="admin-dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>
            Manage jobs, applications, candidates and users.
          </p>
        </div>

        <button
          className="refresh-dashboard-btn"
          onClick={fetchDashboard}
        >
          Refresh
        </button>
      </div>

      {/* STATISTICS */}
      <div className="admin-stats">

        <div className="admin-stat-card">
          <div className="stat-content">
            <h3>Total Jobs</h3>
            <strong>{statistics.totalJobs}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-content">
            <h3>Total Applications</h3>
            <strong>{statistics.totalApplications}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-content">
            <h3>Total Users</h3>
            <strong>{statistics.totalUsers}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-content">
            <h3>Pending Applications</h3>
            <strong>{statistics.pendingApplications}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-content">
            <h3>Shortlisted</h3>
            <strong>{statistics.shortlistedApplications}</strong>
          </div>
        </div>

      </div>

      {/* RECENT JOBS */}
      <div className="admin-section">

        <div className="section-header">
          <h2>Recent Jobs</h2>
        </div>

        {recentJobs.length === 0 ? (
          <p className="empty-message">
            No jobs available.
          </p>
        ) : (
          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Job Type</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {recentJobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.title}</td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                    <td>{job.job_type}</td>
                    <td>
                      {new Date(
                        job.created_at
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* RECENT APPLICATIONS */}
      <div className="admin-section">

        <div className="section-header">
          <h2>Recent Applications</h2>
        </div>

        {recentApplications.length === 0 ? (
          <p className="empty-message">
            No applications available.
          </p>
        ) : (
          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Email</th>
                  <th>Job</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {recentApplications.map((application) => (
                  <tr key={application.id}>

                    <td>
                      {application.candidate_name}
                    </td>

                    <td>
                      {application.email}
                    </td>

                    <td>
                      {application.job_title}
                    </td>

                    <td>
                      {application.company}
                    </td>

                    <td>
                      <span
                        className={`status-badge ${application.status}`}
                      >
                        {application.status}
                      </span>
                    </td>

                    <td>
                      {new Date(
                        application.applied_date
                      ).toLocaleDateString()}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
};

export default AdminDashboard;