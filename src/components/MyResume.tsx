import { useEffect, useState } from "react";
import axios from "axios";
import "./MyResume.css";

interface ResumeData {
  resume_file: string;
  resume_name: string;
  professional_title: string;
  skills: string;
  experience: string;
  education: string;
  summary: string;
}

const MyResume = () => {
  const [resume, setResume] = useState<ResumeData>({
    resume_file: "",
    resume_name: "",
    professional_title: "",
    skills: "",
    experience: "",
    education: "",
    summary: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/resume/${user.id}`
      );

      if (response.data.success && response.data.resume) {
        setResume({
          resume_file: response.data.resume.resume_file || "",
          resume_name: response.data.resume.resume_name || "",
          professional_title:
            response.data.resume.professional_title || "",
          skills: response.data.resume.skills || "",
          experience: response.data.resume.experience || "",
          education: response.data.resume.education || "",
          summary: response.data.resume.summary || "",
        });
      }
    } catch (error) {
      console.error("Failed to load resume:", error);
      setMessage("Failed to load resume.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setResume((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save resume information
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      setMessage("Please login first.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const response = await axios.put(
        `http://localhost:5000/api/resume/${user.id}`,
        {
          resume_name: resume.resume_name,
          professional_title: resume.professional_title,
          skills: resume.skills,
          experience: resume.experience,
          education: resume.education,
          summary: resume.summary,
          resume_file: resume.resume_file || null,
        }
      );

      if (response.data.success) {
        setMessage("Resume information saved successfully!");
        await fetchResume();
      }
    } catch (error) {
      console.error("Save resume error:", error);
      setMessage("Failed to save resume.");
    } finally {
      setSaving(false);
    }
  };

  // Upload resume file
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!user?.id) {
      setMessage("Please login first.");
      return;
    }

    const allowedExtensions = [".pdf", ".doc", ".docx"];

    const fileName = file.name.toLowerCase();

    const validFile = allowedExtensions.some((extension) =>
      fileName.endsWith(extension)
    );

    if (!validFile) {
      setMessage("Only PDF, DOC and DOCX files are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("File size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    try {
      setUploading(true);
      setMessage("");

      const formData = new FormData();

      formData.append("resume", file);

      const response = await axios.post(
        `http://localhost:5000/api/resume/upload/${user.id}`,
        formData
      );

      if (response.data.success) {
        setResume((prev) => ({
          ...prev,
          resume_file: response.data.resume_file,
          resume_name: response.data.resume_name,
        }));

        setMessage("Resume file uploaded successfully!");

        await fetchResume();
      }
    } catch (error: any) {
      console.error("Upload resume error:", error);

      setMessage(
        error?.response?.data?.message ||
          "Failed to upload resume file."
      );
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  if (!user) {
    return (
      <div className="resume-page">
        <div className="resume-card">
          <h2>My Resume</h2>
          <p>Please login to access your resume.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="resume-page">
        <div className="resume-card">
          <p>Loading resume...</p>
        </div>
      </div>
    );
  }

  const resumeUrl = resume.resume_file
    ? `http://localhost:5000${resume.resume_file}`
    : "";

  return (
    <div className="resume-page">
      <div className="resume-header">
        <h1>My Resume</h1>
        <p>Create and manage your professional resume.</p>
      </div>

      {/* Resume File Upload */}
      <div className="resume-card upload-card">
        <h2>Upload Resume File</h2>

        <p className="upload-info">
          Upload your resume in PDF, DOC or DOCX format.
          Maximum file size: 5 MB.
        </p>

        <div className="file-upload-box">
          <input
            type="file"
            id="resumeFile"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            disabled={uploading}
          />

          {uploading && (
            <p className="upload-status">
              Uploading resume...
            </p>
          )}
        </div>

        {resume.resume_file && (
          <div className="uploaded-resume">
            <p>
              <strong>Uploaded Resume:</strong>{" "}
              {resume.resume_name}
            </p>

            <div className="resume-actions">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="view-resume-btn"
              >
                View Resume
              </a>

              <a
                href={resumeUrl}
                download
                className="download-resume-btn"
              >
                Download Resume
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Resume Information */}
      <form className="resume-card" onSubmit={handleSave}>
        <h2>Resume Information</h2>

        <div className="form-group">
          <label>Resume Name</label>

          <input
            type="text"
            name="resume_name"
            value={resume.resume_name}
            onChange={handleChange}
            placeholder="Example: My Professional Resume"
          />
        </div>

        <div className="form-group">
          <label>Professional Title</label>

          <input
            type="text"
            name="professional_title"
            value={resume.professional_title}
            onChange={handleChange}
            placeholder="Example: React Developer"
          />
        </div>

        <div className="form-group">
          <label>Skills</label>

          <input
            type="text"
            name="skills"
            value={resume.skills}
            onChange={handleChange}
            placeholder="React, JavaScript, TypeScript, Node.js, MySQL"
          />
        </div>

        <div className="form-group">
          <label>Experience</label>

          <input
            type="text"
            name="experience"
            value={resume.experience}
            onChange={handleChange}
            placeholder="Example: 2 Years"
          />
        </div>

        <div className="form-group">
          <label>Education</label>

          <input
            type="text"
            name="education"
            value={resume.education}
            onChange={handleChange}
            placeholder="Example: B.Tech Computer Science"
          />
        </div>

        <div className="form-group">
          <label>Professional Summary</label>

          <textarea
            name="summary"
            value={resume.summary}
            onChange={handleChange}
            rows={6}
            placeholder="Write a short professional summary..."
          />
        </div>

        {message && (
          <div className="resume-message">
            {message}
          </div>
        )}

        <button
          type="submit"
          className="save-resume-btn"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Resume"}
        </button>
      </form>
    </div>
  );
};

export default MyResume;