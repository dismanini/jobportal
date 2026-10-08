const express = require("express");
const router = express.Router();

const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const sql = `
      SELECT
        id,
        name,
        email,
        role,
        created_at
      FROM users
      ORDER BY created_at DESC
    `;

    const [rows] = await db.query(sql);

    res.json({
      success: true,
      users: rows,
    });
  } catch (error) {
    console.error("Get users error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load users.",
      error: error.message,
    });
  }
});

module.exports = router;