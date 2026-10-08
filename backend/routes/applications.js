
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const db = require("../db");

// ========================================
// RESUME UPLOAD FOLDER
// ========================================

const uploadDirectory = path.join(
  __dirname,
  "..",
  "uploads",
  "applications"
);

// Create folder automatically if it does not exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true
  });
}

// ========================================
// MULTER CONFIGURATION
// ========================================

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },

  filename: function (req, file, cb) {

    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    const filename =
      "resume-" +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      extension;

    cb(null, filename);
  }
});

const upload = multer({

  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024
  },

  fileFilter: function (req, file, cb) {

    const allowedExtensions = [
      ".pdf",
      ".doc",
      ".docx"
    ];

    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    if (allowedExtensions.includes(extension)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only PDF, DOC and DOCX files are allowed."
        )
      );
    }
  }
});


// ========================================
// CREATE APPLICATION
// POST /api/applications
// ========================================

router.post(
  "/",
  upload.single("resume"),
  async (req, res) => {

    try {

      console.log("Application body:", req.body);
      console.log("Uploaded file:", req.file);

      const {
        job_id,
        candidate_name,
        email,
        phone,
        cover_letter
      } = req.body;

      // ========================================
      // VALIDATION
      // ========================================

      if (!job_id || !candidate_name || !email) {

        return res.status(400).json({
          success: false,
          message:
            "Job ID, candidate name and email are required."
        });

      }

      // ========================================
      // RESUME PATH
      // ========================================

      let resume = null;

      if (req.file) {

        resume =
          "/uploads/applications/" +
          req.file.filename;

      }

      // ========================================
      // INSERT APPLICATION
      // ========================================

      const sql = `
        INSERT INTO applications
        (
          job_id,
          candidate_name,
          email,
          phone,
          resume,
          cover_letter
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const values = [
        job_id,
        candidate_name,
        email,
        phone || null,
        resume,
        cover_letter || null
      ];

      const [result] = await db.query(
        sql,
        values
      );

      // ========================================
      // SUCCESS
      // ========================================

      res.status(201).json({

        success: true,

        message:
          "Application submitted successfully.",

        applicationId:
          result.insertId,

        resume: resume

      });

    } catch (error) {

      console.error(
        "Create application error:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          error.message ||
          "Failed to create application."

      });

    }

  }
);


// ========================================
// GET ALL APPLICATIONS
// GET /api/applications
// ========================================

router.get("/", async (req, res) => {

  try {

    const sql = `
      SELECT
        applications.*,
        jobs.title AS job_title,
        jobs.company
      FROM applications
      LEFT JOIN jobs
        ON applications.job_id = jobs.id
      ORDER BY applications.id DESC
    `;

    const [results] = await db.query(sql);

    res.json({
      success: true,
      applications: results
    });

  } catch (error) {

    console.error(
      "Get applications error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch applications."
    });

  }

});


// ========================================
// GET SINGLE APPLICATION
// GET /api/applications/:id
// ========================================

router.get("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const sql = `
      SELECT
        applications.*,
        jobs.title AS job_title,
        jobs.company,
        jobs.location
      FROM applications
      LEFT JOIN jobs
        ON applications.job_id = jobs.id
      WHERE applications.id = ?
    `;

    const [results] = await db.query(
      sql,
      [id]
    );

    if (results.length === 0) {

      return res.status(404).json({
        success: false,
        message:
          "Application not found."
      });

    }

    res.json({
      success: true,
      application: results[0]
    });

  } catch (error) {

    console.error(
      "Get application error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch application."
    });

  }

});


// ========================================
// UPDATE APPLICATION STATUS
// PUT /api/applications/:id/status
// ========================================

router.put("/:id/status", async (req, res) => {

  try {

    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "shortlisted",
      "rejected",
      "hired"
    ];

    if (!allowedStatuses.includes(status)) {

      return res.status(400).json({
        success: false,
        message:
          "Invalid application status."
      });

    }

    const sql = `
      UPDATE applications
      SET status = ?
      WHERE id = ?
    `;

    const [result] = await db.query(
      sql,
      [status, id]
    );

    if (result.affectedRows === 0) {

      return res.status(404).json({
        success: false,
        message:
          "Application not found."
      });

    }

    res.json({
      success: true,
      message:
        "Application status updated successfully."
    });

  } catch (error) {

    console.error(
      "Update status error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update application status."
    });

  }

});


// ========================================
// DELETE APPLICATION
// DELETE /api/applications/:id
// ========================================

router.delete("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const sql = `
      DELETE FROM applications
      WHERE id = ?
    `;

    const [result] = await db.query(
      sql,
      [id]
    );

    if (result.affectedRows === 0) {

      return res.status(404).json({
        success: false,
        message:
          "Application not found."
      });

    }

    res.json({
      success: true,
      message:
        "Application deleted successfully."
    });

  } catch (error) {

    console.error(
      "Delete application error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete application."
    });

  }

});


module.exports = router;

