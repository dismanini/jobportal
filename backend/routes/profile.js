const express = require("express");
const router = express.Router();
const db = require("../db");

// GET profile by user ID
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await db.query(
      `
      SELECT
        u.id,
        u.name,
        u.email,
        u.role,
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
      WHERE u.id = ?
      `,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      profile: rows[0],
    });
  } catch (error) {
    console.error("Get profile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get profile",
    });
  }
});

// CREATE profile
router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      phone,
      location,
      professional_title,
      bio,
      skills,
      experience,
      education,
      profile_image,
    } = req.body || {};

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "user_id is required",
      });
    }

    const [existing] = await db.query(
      "SELECT id FROM user_profiles WHERE user_id = ?",
      [user_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists",
      });
    }

    await db.query(
      `
      INSERT INTO user_profiles
      (
        user_id,
        phone,
        location,
        professional_title,
        bio,
        skills,
        experience,
        education,
        profile_image
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        user_id,
        phone || null,
        location || null,
        professional_title || null,
        bio || null,
        skills || null,
        experience || null,
        education || null,
        profile_image || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
    });
  } catch (error) {
    console.error("Create profile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create profile",
    });
  }
});

// UPDATE profile
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const {
      name,
      phone,
      location,
      professional_title,
      bio,
      skills,
      experience,
      education,
      profile_image,
    } = req.body || {};

    // Update basic user information
    if (name) {
      await db.query(
        "UPDATE users SET name = ? WHERE id = ?",
        [name, userId]
      );
    }

    // Check whether profile exists
    const [existing] = await db.query(
      "SELECT id FROM user_profiles WHERE user_id = ?",
      [userId]
    );

    if (existing.length === 0) {
      await db.query(
        `
        INSERT INTO user_profiles
        (
          user_id,
          phone,
          location,
          professional_title,
          bio,
          skills,
          experience,
          education,
          profile_image
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          userId,
          phone || null,
          location || null,
          professional_title || null,
          bio || null,
          skills || null,
          experience || null,
          education || null,
          profile_image || null,
        ]
      );
    } else {
      await db.query(
        `
        UPDATE user_profiles
        SET
          phone = ?,
          location = ?,
          professional_title = ?,
          bio = ?,
          skills = ?,
          experience = ?,
          education = ?,
          profile_image = ?
        WHERE user_id = ?
        `,
        [
          phone || null,
          location || null,
          professional_title || null,
          bio || null,
          skills || null,
          experience || null,
          education || null,
          profile_image || null,
          userId,
        ]
      );
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
});

module.exports = router;