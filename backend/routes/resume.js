const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../db");

// --------------------------------------------------
// MULTER CONFIGURATION
// --------------------------------------------------

const uploadDir = path.join(__dirname, "../uploads/resumes");

// Create folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const userId = req.params.userId || req.body.user_id;
    const extension = path.extname(file.originalname);

    cb(
      null,
      `resume_${userId}_${Date.now()}${extension}`
    );
  },
});

// Allow PDF, DOC and DOCX
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC and DOCX files are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

// --------------------------------------------------
// GET RESUME
// --------------------------------------------------

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await db.query(
      `
      SELECT
        id,
        user_id,
        resume_file,
        resume_name,
        professional_title,
        skills,
        experience,
        education,
        summary
      FROM resumes
      WHERE user_id = ?
      `,
      [userId]
    );

    if (rows.length === 0) {
      return res.json({
        success: true,
        resume: null,
      });
    }

    res.json({
      success: true,
      resume: rows[0],
    });
  } catch (error) {
    console.error("Get resume error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get resume",
    });
  }
});

// --------------------------------------------------
// CREATE RESUME
// --------------------------------------------------

router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      resume_file,
      resume_name,
      professional_title,
      skills,
      experience,
      education,
      summary,
    } = req.body || {};

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "user_id is required",
      });
    }

    const [existing] = await db.query(
      "SELECT id FROM resumes WHERE user_id = ?",
      [user_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Resume already exists",
      });
    }

    await db.query(
      `
      INSERT INTO resumes
      (
        user_id,
        resume_file,
        resume_name,
        professional_title,
        skills,
        experience,
        education,
        summary
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        user_id,
        resume_file || null,
        resume_name || null,
        professional_title || null,
        skills || null,
        experience || null,
        education || null,
        summary || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Resume created successfully",
    });
  } catch (error) {
    console.error("Create resume error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create resume",
    });
  }
});

// --------------------------------------------------
// UPDATE RESUME INFORMATION
// --------------------------------------------------

router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const {
      resume_file,
      resume_name,
      professional_title,
      skills,
      experience,
      education,
      summary,
    } = req.body || {};

    const [existing] = await db.query(
      "SELECT id FROM resumes WHERE user_id = ?",
      [userId]
    );

    if (existing.length === 0) {
      await db.query(
        `
        INSERT INTO resumes
        (
          user_id,
          resume_file,
          resume_name,
          professional_title,
          skills,
          experience,
          education,
          summary
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          userId,
          resume_file || null,
          resume_name || null,
          professional_title || null,
          skills || null,
          experience || null,
          education || null,
          summary || null,
        ]
      );
    } else {
      await db.query(
        `
        UPDATE resumes
        SET
          resume_file = ?,
          resume_name = ?,
          professional_title = ?,
          skills = ?,
          experience = ?,
          education = ?,
          summary = ?
        WHERE user_id = ?
        `,
        [
          resume_file || null,
          resume_name || null,
          professional_title || null,
          skills || null,
          experience || null,
          education || null,
          summary || null,
          userId,
        ]
      );
    }

    res.json({
      success: true,
      message: "Resume updated successfully",
    });
  } catch (error) {
    console.error("Update resume error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update resume",
    });
  }
});

// --------------------------------------------------
// UPLOAD RESUME FILE
// --------------------------------------------------

router.post(
  "/upload/:userId",
  upload.single("resume"),
  async (req, res) => {
    try {
      const { userId } = req.params;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please select a resume file.",
        });
      }

      const resumeFile = `/uploads/resumes/${req.file.filename}`;

      const [existing] = await db.query(
        "SELECT id, resume_file FROM resumes WHERE user_id = ?",
        [userId]
      );

      if (existing.length === 0) {
        await db.query(
          `
          INSERT INTO resumes
          (
            user_id,
            resume_file,
            resume_name
          )
          VALUES (?, ?, ?)
          `,
          [
            userId,
            resumeFile,
            req.file.originalname,
          ]
        );
      } else {
        // Delete old file if one exists
        if (existing[0].resume_file) {
          const oldFilePath = path.join(
            __dirname,
            "..",
            existing[0].resume_file
          );

          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        }

        await db.query(
          `
          UPDATE resumes
          SET
            resume_file = ?,
            resume_name = ?
          WHERE user_id = ?
          `,
          [
            resumeFile,
            req.file.originalname,
            userId,
          ]
        );
      }

      res.json({
        success: true,
        message: "Resume file uploaded successfully.",
        resume_file: resumeFile,
        resume_name: req.file.originalname,
      });
    } catch (error) {
      console.error("Resume upload error:", error);

      res.status(500).json({
        success: false,
        message: "Failed to upload resume.",
      });
    }
  }
);

module.exports = router;