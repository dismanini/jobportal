import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyProfile.css";

interface Profile {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string | null;
  location: string | null;
  professional_title: string | null;
  bio: string | null;
  skills: string | null;
  experience: string | null;
  education: string | null;
  profile_image: string | null;
}

const MyProfile: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    professional_title: "",
    bio: "",
    skills: "",
    experience: "",
    education: "",
  });

  const loadProfile = async () => {
    try {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        alert("Please login first.");
        return;
      }

      const user = JSON.parse(savedUser);

      const response = await axios.get(
        `http://localhost:5000/api/profile/${user.id}`
      );

      if (response.data.success) {
        const data = response.data.profile;

        setProfile(data);

        setFormData({
          name: data.name || "",
          phone: data.phone || "",
          location: data.location || "",
          professional_title:
            data.professional_title || "",
          bio: data.bio || "",
          skills: data.skills || "",
          experience: data.experience || "",
          education: data.education || "",
        });
      }
    } catch (error) {
      console.error("Profile loading error:", error);
      alert("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        alert("Please login first.");
        return;
      }

      const user = JSON.parse(savedUser);

      setSaving(true);

      const response = await axios.put(
        `http://localhost:5000/api/profile/${user.id}`,
        formData
      );

      if (response.data.success) {
        alert("Profile updated successfully!");

        await loadProfile();
      }
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-header">
        <div>
          <h1>My Profile</h1>
          <p>
            Manage your personal and professional information
          </p>
        </div>
      </div>

      {/* Profile Summary */}

      <div className="profile-summary">

        <div className="profile-avatar">
          {profile?.name
            ? profile.name.charAt(0).toUpperCase()
            : "U"}
        </div>

        <div>
          <h2>
            {profile?.name || "Job Seeker"}
          </h2>

          <p>
            {profile?.professional_title ||
              "Job Seeker"}
          </p>

          <span>
            {profile?.email}
          </span>
        </div>

      </div>

      {/* Profile Form */}

      <form
        className="profile-form"
        onSubmit={handleSubmit}
      >

        <div className="profile-section">

          <h2>Personal Information</h2>

          <div className="profile-grid">

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label>Phone</label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone"
              />
            </div>

            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your location"
              />
            </div>

            <div className="form-group">
              <label>Professional Title</label>

              <input
                type="text"
                name="professional_title"
                value={formData.professional_title}
                onChange={handleChange}
                placeholder="e.g. React Developer"
              />
            </div>

          </div>

        </div>

        <div className="profile-section">

          <h2>Professional Information</h2>

          <div className="profile-grid">

            <div className="form-group">
              <label>Skills</label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, JavaScript, MySQL"
              />
            </div>

            <div className="form-group">
              <label>Experience</label>

              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 2 years"
              />
            </div>

            <div className="form-group">
              <label>Education</label>

              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="e.g. B.Tech Computer Science"
              />
            </div>

          </div>

          <div className="form-group">

            <label>Bio</label>

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell employers about yourself"
              rows={5}
            />

          </div>

        </div>

        <div className="profile-actions">

          <button
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Profile"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default MyProfile;