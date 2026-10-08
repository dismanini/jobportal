const express = require("express");
const router = express.Router();

const db = require("../db");

// GET all jobs
router.get("/", async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT * FROM jobs ORDER BY id DESC"
    );

    res.json({
      success: true,
      jobs: results
    });
  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs"
    });
  }
});


// CREATE a new job
router.post("/", async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      job_type,
      experience,
      description,
      skills,
      status
    } = req.body;

    if (!title || !company || !location) {
      return res.status(400).json({
        success: false,
        message: "Title, company and location are required"
      });
    }

    const sql = `
      INSERT INTO jobs
      (
        title,
        company,
        location,
        salary,
        job_type,
        experience,
        description,
        skills,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      title,
      company,
      location,
      salary || null,
      job_type || null,
      experience || null,
      description || null,
      skills || null,
      status || "active"
    ];

    const [result] = await db.query(sql, values);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      jobId: result.insertId
    });

  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create job"
    });
  }
});



// DELETE a job
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM jobs WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.json({
      success: true,
      message: "Job deleted successfully"
    });

  } catch (error) {
    console.error("Delete job error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete job"
    });
  }
});

// UPDATE a job
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      company,
      location,
      salary,
      job_type,
      experience,
      description,
      skills,
      status
    } = req.body;

    if (!title || !company || !location) {
      return res.status(400).json({
        success: false,
        message: "Title, company and location are required"
      });
    }

    const sql = `
      UPDATE jobs
      SET
        title = ?,
        company = ?,
        location = ?,
        salary = ?,
        job_type = ?,
        experience = ?,
        description = ?,
        skills = ?,
        status = ?
      WHERE id = ?
    `;

    const values = [
      title,
      company,
      location,
      salary || null,
      job_type || null,
      experience || null,
      description || null,
      skills || null,
      status || "active",
      id
    ];

    const [result] = await db.query(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.json({
      success: true,
      message: "Job updated successfully"
    });

  } catch (error) {
    console.error("Update job error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update job"
    });
  }
});

module.exports = router;