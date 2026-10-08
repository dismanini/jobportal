const express = require("express");
const router = express.Router();

const db = require("../db");

/*
  GET ALL CANDIDATES

  Candidates = users whose role is "job_seeker"

  Data comes from:
  users
  +
  user_profiles
*/

router.get("/", async (req, res) => {
  try {
    const sql = `
      SELECT
        u.id,
        u.name,
        u.email,
        u.created_at,

        p.phone,
        p.location,
        p.professional_title,
        p.bio,
        p.skills,
        p.experience,
        p.education,
        p.profile_image

      FROM users u

      LEFT JOIN user_profiles p
        ON u.id = p.user_id

      WHERE u.role = 'job_seeker'

      ORDER BY u.created_at DESC
    `;

    const [rows] = await db.query(sql);

    res.status(200).json({
      success: true,
      candidates: rows,
    });
  } catch (error) {
    console.error("Get candidates error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load candidates.",
      error: error.message,
    });
  }
});

module.exports = router;