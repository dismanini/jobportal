import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  FileText,
  MapPin,
  Upload,
  X,
} from "lucide-react";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  mode: string;
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "Microsoft",
    location: "Bangalore, India",
    salary: "₹15L - ₹22L",
    type: "Full Time",
    experience: "5+ Years",
    mode: "Hybrid",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Google",
    location: "Hyderabad, India",
    salary: "₹12L - ₹20L",
    type: "Full Time",
    experience: "2-5 Years",
    mode: "On-site",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Adobe",
    location: "Remote",
    salary: "₹8L - ₹14L",
    type: "Full Time",
    experience: "2-5 Years",
    mode: "Remote",
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "Amazon",
    location: "Chennai, India",
    salary: "₹14L - ₹24L",
    type: "Full Time",
    experience: "5+ Years",
    mode: "Hybrid",
  },
  {
    id: 5,
    title: "Junior Frontend Developer",
    company: "Infosys",
    location: "Pune, India",
    salary: "₹5L - ₹8L",
    type: "Full Time",
    experience: "0-2 Years",
    mode: "On-site",
  },
  {
    id: 6,
    title: "React Developer",
    company: "Accenture",
    location: "Mumbai, India",
    salary: "₹8L - ₹15L",
    type: "Contract",
    experience: "2-5 Years",
    mode: "Remote",
  },
];

export default function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const jobId = Number(id);

  const job = jobs.find((item) => item.id === jobId) || jobs[0];

  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    skills: "",
    noticePeriod: "",
    expectedSalary: "",
    coverLetter: "",
  });

  const [resume, setResume] = useState<File | null>(null);

  const [resumeError, setResumeError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  // =========================================================
  // INPUT HANDLER
  // =========================================================

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // =========================================================
  // RESUME HANDLER
  // =========================================================

  const handleResumeChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setResumeError("");

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setResumeError(
        "Please upload a PDF, DOC, or DOCX file."
      );

      e.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      setResumeError(
        "Resume size must be less than 5 MB."
      );

      e.target.value = "";
      return;
    }

    setResume(file);
  };

  // =========================================================
  // REMOVE RESUME
  // =========================================================

  const removeResume = () => {
    setResume(null);
    setResumeError("");
  };

  // =========================================================
  // SUBMIT FORM
  // =========================================================

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!resume) {
      setResumeError("Please upload your resume.");
      return;
    }

    setIsSubmitting(true);

    /*
      Currently this is frontend-only.

      Later we will replace this with:

      const formDataToSend = new FormData();

      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("resume", resume);

      await fetch("/api/applications", {
        method: "POST",
        body: formDataToSend,
      });
    */

    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    );

    setIsSubmitting(false);
    setSubmitted(true);
  };

  // =========================================================
  // SUCCESS SCREEN
  // =========================================================

  if (submitted) {
    return (
      <div className="flex min-h-[600px] items-center justify-center">
        <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 dark:bg-green-500/10">
            <CheckCircle2
              size={42}
              className="text-green-600"
            />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-gray-800 dark:text-white">
            Application Submitted!
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
            Your application for{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {job.title}
            </span>{" "}
            at{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {job.company}
            </span>{" "}
            has been submitted successfully.
          </p>

          <div className="mt-6 rounded-xl bg-gray-50 p-4 text-left dark:bg-gray-800/50">
            <p className="text-xs text-gray-400">
              Application Status
            </p>

            <p className="mt-1 text-sm font-semibold text-green-600">
              Application Submitted
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/applied-jobs")}
              className="flex-1 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View Applied Jobs
            </button>

            <button
              onClick={() => navigate("/find-jobs")}
              className="flex-1 rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Find More Jobs
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN PAGE
  // =========================================================

  return (
    <div className="space-y-6">
      {/* =====================================================
          BACK
      ===================================================== */}

      <Link
        to={`/job-details/${job.id}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
      >
        <ArrowLeft size={18} />
        Back to Job Details
      </Link>

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Apply for Job
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Complete the application form below to apply for
          this position.
        </p>
      </div>

      {/* =====================================================
          JOB SUMMARY
      ===================================================== */}

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-start gap-4">
          {/* Company Logo */}

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-lg font-bold text-blue-600 dark:bg-blue-500/10">
            {job.company.charAt(0)}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {job.title}
            </h2>

            <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
              {job.company}
            </p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {job.location}
              </span>

              <span className="flex items-center gap-1">
                <Briefcase size={14} />
                {job.type}
              </span>

              <span>
                {job.salary}
              </span>

              <span>
                {job.mode}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          APPLICATION FORM
      ===================================================== */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* ===================================================
            PERSONAL INFORMATION
        =================================================== */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Personal Information
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tell the employer a little about yourself.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Full Name */}

            <FormField
              label="Full Name"
              required
            >
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className={inputClass}
              />
            </FormField>

            {/* Email */}

            <FormField
              label="Email Address"
              required
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className={inputClass}
              />
            </FormField>

            {/* Phone */}

            <FormField
              label="Phone Number"
              required
            >
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
                className={inputClass}
              />
            </FormField>

            {/* Location */}

            <FormField
              label="Current Location"
              required
            >
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Bangalore, India"
                required
                className={inputClass}
              />
            </FormField>
          </div>
        </section>

        {/* ===================================================
            PROFESSIONAL INFORMATION
        =================================================== */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Professional Information
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Provide information about your professional
              background.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Experience */}

            <FormField
              label="Years of Experience"
              required
            >
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">
                  Select experience
                </option>

                <option value="0-1">
                  0 - 1 Year
                </option>

                <option value="1-2">
                  1 - 2 Years
                </option>

                <option value="2-5">
                  2 - 5 Years
                </option>

                <option value="5-8">
                  5 - 8 Years
                </option>

                <option value="8+">
                  8+ Years
                </option>
              </select>
            </FormField>

            {/* Notice Period */}

            <FormField
              label="Notice Period"
              required
            >
              <select
                name="noticePeriod"
                value={formData.noticePeriod}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">
                  Select notice period
                </option>

                <option value="Immediate">
                  Immediate
                </option>

                <option value="15 Days">
                  15 Days
                </option>

                <option value="30 Days">
                  30 Days
                </option>

                <option value="60 Days">
                  60 Days
                </option>

                <option value="90 Days">
                  90 Days
                </option>
              </select>
            </FormField>

            {/* Expected Salary */}

            <FormField
              label="Expected Salary"
            >
              <input
                type="text"
                name="expectedSalary"
                value={formData.expectedSalary}
                onChange={handleChange}
                placeholder="e.g. ₹18 LPA"
                className={inputClass}
              />
            </FormField>

            {/* Skills */}

            <FormField
              label="Skills"
              required
            >
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, TypeScript, Next.js"
                required
                className={inputClass}
              />
            </FormField>
          </div>
        </section>

        {/* ===================================================
            RESUME
        =================================================== */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Resume
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Upload your latest resume.
            </p>
          </div>

          {!resume ? (
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 px-6 py-10 transition hover:border-blue-400 hover:bg-blue-50/30 dark:border-gray-700 dark:hover:border-blue-500 dark:hover:bg-blue-500/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 dark:bg-blue-500/10">
                <Upload
                  size={24}
                  className="text-blue-600"
                />
              </div>

              <p className="mt-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                Click to upload your resume
              </p>

              <p className="mt-1 text-xs text-gray-400">
                PDF, DOC or DOCX · Maximum 5 MB
              </p>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10">
                  <FileText
                    size={22}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <p className="max-w-[220px] truncate text-sm font-medium text-gray-700 dark:text-gray-200">
                    {resume.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {(resume.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={removeResume}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white hover:text-red-500 dark:hover:bg-gray-700"
                aria-label="Remove resume"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {resumeError && (
            <p className="mt-3 text-sm text-red-500">
              {resumeError}
            </p>
          )}
        </section>

        {/* ===================================================
            COVER LETTER
        =================================================== */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Cover Letter
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tell the employer why you are a good fit for
              this position.
            </p>
          </div>

          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows={8}
            placeholder="Write your cover letter here..."
            className={`${inputClass} resize-none`}
          />

          <p className="mt-2 text-xs text-gray-400">
            Keep your cover letter clear and relevant to the
            position.
          </p>
        </section>

        {/* ===================================================
            ACTIONS
        =================================================== */}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            to={`/job-details/${job.id}`}
            className="flex h-12 items-center justify-center rounded-lg border border-gray-200 px-6 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 items-center justify-center rounded-lg bg-blue-600 px-8 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

/* =========================================================
   INPUT STYLE
========================================================= */

const inputClass =
  "h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500";