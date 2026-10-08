const express = require("express");
const router = express.Router();

const db = require("../db");

/*
  GET ALL MESSAGES FOR ADMIN

  For now, this gets messages where the receiver
  is an admin.
*/

router.get("/admin/:adminId", async (req, res) => {
  try {
    const { adminId } = req.params;

    const sql = `
      SELECT
        m.id,
        m.subject,
        m.message,
        m.status,
        m.created_at,

        sender.id AS sender_id,
        sender.name AS sender_name,
        sender.email AS sender_email,

        receiver.id AS receiver_id,
        receiver.name AS receiver_name,
        receiver.email AS receiver_email

      FROM messages m

      INNER JOIN users sender
        ON m.sender_id = sender.id

      INNER JOIN users receiver
        ON m.receiver_id = receiver.id

      WHERE m.receiver_id = ?

      ORDER BY m.created_at DESC
    `;

    const [rows] = await db.query(sql, [adminId]);

    res.json({
      success: true,
      messages: rows,
    });
  } catch (error) {
    console.error("Get admin messages error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load messages.",
      error: error.message,
    });
  }
});


/*
  GET SINGLE MESSAGE
*/

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const sql = `
      SELECT
        m.id,
        m.subject,
        m.message,
        m.status,
        m.created_at,

        sender.id AS sender_id,
        sender.name AS sender_name,
        sender.email AS sender_email,

        receiver.id AS receiver_id,
        receiver.name AS receiver_name,
        receiver.email AS receiver_email

      FROM messages m

      INNER JOIN users sender
        ON m.sender_id = sender.id

      INNER JOIN users receiver
        ON m.receiver_id = receiver.id

      WHERE m.sender_id = ?
         OR m.receiver_id = ?

      ORDER BY m.created_at DESC
    `;

    const [rows] = await db.query(sql, [
      userId,
      userId,
    ]);

    res.json({
      success: true,
      messages: rows,
    });
  } catch (error) {
    console.error("Get user messages error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load user messages.",
      error: error.message,
    });
  }
});


/*
  SEND MESSAGE
*/

router.post("/", async (req, res) => {
  try {
    const {
      sender_id,
      receiver_id,
      subject,
      message,
    } = req.body;

    if (
      !sender_id ||
      !receiver_id ||
      !subject ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Sender, receiver, subject and message are required.",
      });
    }

    const sql = `
      INSERT INTO messages
      (
        sender_id,
        receiver_id,
        subject,
        message
      )
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      sender_id,
      receiver_id,
      subject,
      message,
    ]);

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      messageId: result.insertId,
    });
  } catch (error) {
    console.error("Send message error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message.",
      error: error.message,
    });
  }
});


/*
  MARK MESSAGE AS READ
*/

router.put("/:id/read", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      `
      UPDATE messages
      SET status = 'read'
      WHERE id = ?
      `,
      [id]
    );

    res.json({
      success: true,
      message: "Message marked as read.",
    });
  } catch (error) {
    console.error("Mark message read error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update message.",
    });
  }
});


/*
  DELETE MESSAGE
*/

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM messages WHERE id = ?",
      [id]
    );

    res.json({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (error) {
    console.error("Delete message error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete message.",
    });
  }
});


module.exports = router;