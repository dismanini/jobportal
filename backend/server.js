const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const db = require("./db");

const app = express();
const jobsRoutes = require("./routes/jobs");
const applicationRoutes = require("./routes/applications");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const resumeRoutes = require("./routes/resume");
const adminRoutes = require("./routes/admin");
const usersRoutes = require("./routes/users");
const candidatesRoutes = require("./routes/candidates");
const messagesRoutes = require("./routes/messages");



app.use(cors());
app.use(express.json());


app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Jobs API
app.use("/api/jobs", jobsRoutes);

app.use("/api/applications", applicationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/candidates", candidatesRoutes);
app.use("/api/messages", messagesRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "CompuPlus Recruit Backend is running!"
  });
});

app.get("/api/jobs", async (req, res) => {
  try {
    const [jobs] = await db.query(
      "SELECT * FROM jobs WHERE status = 'active' ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      jobs: jobs
    });

  } catch (error) {
    console.error("Jobs error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});