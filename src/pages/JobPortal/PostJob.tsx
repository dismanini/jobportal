import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle,
  DollarSign,
  FileText,
  MapPin,
  Plus,
  X,
} from "lucide-react";

const POSTED_JOBS_KEY = "postedJobs";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  skills: string[];
  postedAt: string;
}

export default function PostJob() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Full Time");
  const [experience, setExperience] = useState("0-2 Years");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [requirementInput, setRequirementInput] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const [requirements, setRequirements] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const [success, setSuccess] = useState(false);

  // Add requirement
  const addRequirement = () => {
    const value = requirementInput.trim();

    if (!value) return;

    setRequirements((prev) => [...prev, value]);
    setRequirementInput("");
  };

  // Remove requirement
  const removeRequirement = (index: number) => {
    setRequirements((prev) => prev.filter((_, i) => i !== index));
  };

  // Add skill
  const addSkill = () => {
    const value = skillInput.trim();

    if (!value) return;

    setSkills((prev) => [...prev, value]);
    setSkillInput("");
  };

  // Remove skill
  const removeSkill = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit job
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !title ||
      !company ||
      !location ||
      !salary ||
      !description
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const newJob: Job = {
      id: Date.now(),
      title,
      company,
      location,
      type,
      experience,
      salary,
      description,
      requirements,
      skills,
      postedAt: new Date().toISOString(),
    };

    // Get existing jobs
    const existingJobs: Job[] = JSON.parse(
      localStorage.getItem(POSTED_JOBS_KEY) || "[]"
    );

    // Add new job
    const updatedJobs = [...existingJobs, newJob];

    // Save
    localStorage.setItem(
      POSTED_JOBS_KEY,
      JSON.stringify(updatedJobs)
    );

    console.log("Job posted:", newJob);
    console.log("All posted jobs:", updatedJobs);

    setSuccess(true);

    // Clear form
    setTitle("");
    setCompany("");
    setLocation("");
    setType("Full Time");
    setExperience("0-2 Years");
    setSalary("");
    setDescription("");
    setRequirements([]);
    setSkills([]);
    setRequirementInput("");
    setSkillInput("");
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Post a Job
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create a new job opening and find the right candidate.
          </p>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-5 py-4">
          <div className="flex items-center gap-3">
            <CheckCircle
              size={22}
              className="text-green-600"
            />

            <div>
              <p className="font-semibold text-green-800">
                Job posted successfully!
              </p>

              <p className="text-sm text-green-700">
                Your job has been added to your posted jobs.
              </p>
            </div>
          </div>

          <button
            onClick={() => setSuccess(false)}
            className="text-green-600 hover:text-green-800"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >

        {/* Basic Information */}
        <div className="mb-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <Briefcase
                size={20}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Job Information
              </h2>

              <p className="text-sm text-gray-500">
                Enter the basic information about the position.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Job Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Job Title *
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior React Developer"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Company */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Company *
              </label>

              <div className="relative">
                <Building2
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company name"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Location *
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Hyderabad, India"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Salary */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Salary *
              </label>

              <div className="relative">
                <DollarSign
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="e.g. ₹12L - ₹20L"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Job Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Job Type
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Contract</option>
                <option>Internship</option>
                <option>Freelance</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Experience
              </label>

              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option>Fresher</option>
                <option>0-2 Years</option>
                <option>2-5 Years</option>
                <option>5-8 Years</option>
                <option>8+ Years</option>
              </select>
            </div>

          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <FileText
                size={20}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Job Description
              </h2>

              <p className="text-sm text-gray-500">
                Describe the position and responsibilities.
              </p>
            </div>
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={7}
            placeholder="Write a detailed description of the job..."
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Requirements */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Requirements
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={requirementInput}
              onChange={(e) =>
                setRequirementInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addRequirement();
                }
              }}
              placeholder="e.g. 3+ years of React experience"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={addRequirement}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus size={18} />
              Add
            </button>
          </div>

          {requirements.length > 0 && (
            <div className="mt-4 space-y-2">
              {requirements.map((requirement, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
                >
                  <span className="text-sm text-gray-700">
                    • {requirement}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      removeRequirement(index)
                    }
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Skills
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="e.g. React"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={addSkill}
              className="flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Plus size={18} />
              Add
            </button>
          </div>

          {skills.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-sm text-blue-700"
                >
                  {skill}

                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-blue-500 hover:text-red-500"
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            Post Job
          </button>

        </div>
      </form>
    </div>
  );
}