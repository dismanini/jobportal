const express = require("express");
const router = express.Router();
const db = require("../db");

// ADMIN DASHBOARD
router.get("/dashboard", async (req, res) => {
  try {
    // Total jobs
    const [jobCount] = await db.query(
      "SELECT COUNT(*) AS totalJobs FROM jobs"
    );

    // Total applications
    const [applicationCount] = await db.query(
      "SELECT COUNT(*) AS totalApplications FROM applications"
    );

    // Total users
    const [userCount] = await db.query(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );

    // Pending applications
    const [pendingCount] = await db.query(
      "SELECT COUNT(*) AS pendingApplications FROM applications WHERE status = 'pending'"
    );

    // Shortlisted applications
    const [shortlistedCount] = await db.query(
      "SELECT COUNT(*) AS shortlistedApplications FROM applications WHERE status = 'shortlisted'"
    );

    // Recent jobs
    const [recentJobs] = await db.query(`
      SELECT
        id,
        title,
        company,
        location,
        job_type,
        created_at
      FROM jobs
      ORDER BY created_at DESC
      LIMIT 5
    `);

    // Recent applications
    const [recentApplications] = await db.query(`
      SELECT
        a.id,
        a.candidate_name,
        a.email,
        a.status,
        a.applied_date,
        j.title AS job_title,
        j.company
      FROM applications a
      LEFT JOIN jobs j ON a.job_id = j.id
      ORDER BY a.applied_date DESC
      LIMIT 5
    `);

    res.json({
      success: true,

      statistics: {
        totalJobs: jobCount[0].totalJobs,
        totalApplications: applicationCount[0].totalApplications,
        totalUsers: userCount[0].totalUsers,
        pendingApplications: pendingCount[0].pendingApplications,
        shortlistedApplications:
          shortlistedCount[0].shortlistedApplications,
      },

      recentJobs,
      recentApplications,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard",
    });
  }
});

module.exports = router;