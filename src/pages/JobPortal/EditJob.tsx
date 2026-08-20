import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  DollarSign,
  FileText,
  GraduationCap,
  MapPin,
  Save,
  Tag,
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

interface FormData {
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string;
  skills: string;
}

export default function EditJob() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    title: "",
    company: "",
    location: "",
    type: "Full Time",
    experience: "",
    salary: "",
    description: "",
    requirements: "",
    skills: "",
  });

  // =====================================================
  // LOAD JOB
  // =====================================================

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = () => {
    try {
      const storedJobs = localStorage.getItem(POSTED_JOBS_KEY);

      if (!storedJobs) {
        setError("No posted jobs were found.");
        setLoading(false);
        return;
      }

      const jobs: Job[] = JSON.parse(storedJobs);

      const jobId = Number(id);

      const job = jobs.find((item) => item.id === jobId);

      if (!job) {
        setError("The job you are trying to edit was not found.");
        setLoading(false);
        return;
      }

      setFormData({
        title: job.title || "",
        company: job.company || "",
        location: job.location || "",
        type: job.type || "Full Time",
        experience: job.experience || "",
        salary: job.salary || "",
        description: job.description || "",
        requirements: Array.isArray(job.requirements)
          ? job.requirements.join("\n")
          : "",
        skills: Array.isArray(job.skills)
          ? job.skills.join(", ")
          : "",
      });

      setLoading(false);
    } catch (err) {
      console.error("Error loading job:", err);
      setError("Unable to load this job.");
      setLoading(false);
    }
  };

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // UPDATE JOB
  // =====================================================

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setError("");

    // Basic validation
    if (!formData.title.trim()) {
      setError("Please enter a job title.");
      return;
    }

    if (!formData.company.trim()) {
      setError("Please enter the company name.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Please enter the job location.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please enter a job description.");
      return;
    }

    try {
      setSaving(true);

      const storedJobs = localStorage.getItem(POSTED_JOBS_KEY);

      if (!storedJobs) {
        setError("No jobs were found.");
        setSaving(false);
        return;
      }

      const jobs: Job[] = JSON.parse(storedJobs);

      const jobId = Number(id);

      const jobExists = jobs.some(
        (job) => job.id === jobId
      );

      if (!jobExists) {
        setError("The job could not be found.");
        setSaving(false);
        return;
      }

      // Convert requirements into an array
      const requirements = formData.requirements
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      // Convert skills into an array
      const skills = formData.skills
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      const updatedJobs = jobs.map((job) => {
        if (job.id !== jobId) {
          return job;
        }

        return {
          ...job,
          title: formData.title.trim(),
          company: formData.company.trim(),
          location: formData.location.trim(),
          type: formData.type,
          experience: formData.experience.trim(),
          salary: formData.salary.trim(),
          description: formData.description.trim(),
          requirements,
          skills,
        };
      });

      localStorage.setItem(
        POSTED_JOBS_KEY,
        JSON.stringify(updatedJobs)
      );

      // Go back to Manage Jobs
      navigate("/manage-jobs");
    } catch (err) {
      console.error("Error updating job:", err);
      setError("Something went wrong while updating the job.");
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Loading job...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error && !formData.title) {
    return (
      <div className="flex min-h-[500px] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-900/20">
            <X size={26} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
            Job Not Found
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {error}
          </p>

          <button
            type="button"
            onClick={() => navigate("/manage-jobs")}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <ArrowLeft size={18} />
            Back to Manage Jobs
          </button>

        </div>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-start gap-3">

          <button
            type="button"
            onClick={() => navigate("/manage-jobs")}
            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Edit Job
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Update the details of your job posting.
            </p>
          </div>

        </div>

      </div>

      {/* =================================================
          ERROR MESSAGE
      ================================================= */}

      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          <X size={18} className="mt-0.5 shrink-0" />

          <span>{error}</span>
        </div>
      )}

      {/* =================================================
          FORM
      ================================================= */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* =================================================
            BASIC INFORMATION
        ================================================= */}

        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">

          <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                <BriefcaseBusiness size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Basic Information
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Basic information about the position.
                </p>
              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

            {/* Job Title */}
            <div className="md:col-span-2">

              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Job Title
                <span className="text-red-500"> *</span>
              </label>

              <div className="relative">

                <BriefcaseBusiness
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior React Developer"
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />

              </div>

            </div>

            {/* Company */}
            <div>

              <label
                htmlFor="company"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Company Name
                <span className="text-red-500"> *</span>
              </label>

              <div className="relative">

                <Building2
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. ABC Technologies"
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />

              </div>

            </div>

            {/* Location */}
            <div>

              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Location
                <span className="text-red-500"> *</span>
              </label>

              <div className="relative">

                <MapPin
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Bangalore, India"
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />

              </div>

            </div>

            {/* Job Type */}
            <div>

              <label
                htmlFor="type"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Job Type
              </label>

              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="Full Time">
                  Full Time
                </option>

                <option value="Part Time">
                  Part Time
                </option>

                <option value="Contract">
                  Contract
                </option>

                <option value="Internship">
                  Internship
                </option>

                <option value="Freelance">
                  Freelance
                </option>
              </select>

            </div>

            {/* Experience */}
            <div>

              <label
                htmlFor="experience"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Experience
              </label>

              <div className="relative">

                <GraduationCap
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="experience"
                  name="experience"
                  type="text"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 2-5 Years"
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />

              </div>

            </div>

            {/* Salary */}
            <div className="md:col-span-2">

              <label
                htmlFor="salary"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Salary
              </label>

              <div className="relative">

                <DollarSign
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="salary"
                  name="salary"
                  type="text"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. ₹8 - ₹12 LPA"
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            JOB DESCRIPTION
        ================================================= */}

        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">

          <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-900/20">
                <FileText size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Job Description
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Describe the role and responsibilities.
                </p>
              </div>

            </div>

          </div>

          <div className="p-6">

            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
              <span className="text-red-500"> *</span>
            </label>

            <textarea
              id="description"
              name="description"
              rows={7}
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a detailed description of the job..."
              className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />

            <p className="mt-2 text-xs text-gray-400">
              Give candidates enough information to understand
              the role, responsibilities and expectations.
            </p>

          </div>

        </div>

        {/* =================================================
            REQUIREMENTS
        ================================================= */}

        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">

          <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-700">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-900/20">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Requirements
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add the requirements for this position.
                </p>
              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">

            {/* Requirements */}
            <div>

              <label
                htmlFor="requirements"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Job Requirements
              </label>

              <textarea
                id="requirements"
                name="requirements"
                rows={7}
                value={formData.requirements}
                onChange={handleChange}
                placeholder={`Enter one requirement per line

Example:
Bachelor's degree
2+ years experience
Good communication skills`}
                className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />

              <p className="mt-2 text-xs text-gray-400">
                Enter each requirement on a new line.
              </p>

            </div>

            {/* Skills */}
            <div>

              <label
                htmlFor="skills"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Skills
              </label>

              <div className="relative">

                <Tag
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />

                <textarea
                  id="skills"
                  name="skills"
                  rows={7}
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, JavaScript, TypeScript, Tailwind CSS, Git"
                  className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 pl-10 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />

              </div>

              <p className="mt-2 text-xs text-gray-400">
                Separate skills using commas.
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={() => navigate("/manage-jobs")}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                Saving...
              </>
            ) : (
              <>
                <Save size={18} />

                Save Changes
              </>
            )}
          </button>

        </div>

      </form>
    </div>
  );
}