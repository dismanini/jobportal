import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Search,
  MapPin,
  Briefcase,
  Bookmark,
  SlidersHorizontal,
  X,
  ChevronDown,
  Send,
  Eye,
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
  description: string;
  skills: string[];
};

const STORAGE_KEY = "savedJobs";

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
    description:
      "We are looking for an experienced React Developer to build scalable and high-performance web applications.",
    skills: ["React", "TypeScript", "Next.js", "JavaScript"],
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
    description:
      "Join our frontend engineering team and build modern user experiences used by millions of users.",
    skills: ["React", "JavaScript", "CSS", "HTML"],
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
    description:
      "Create beautiful and intuitive user experiences for next-generation creative products.",
    skills: ["Figma", "UI Design", "UX Design", "Prototyping"],
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
    description:
      "Work on scalable full-stack applications and services that support millions of customers.",
    skills: ["React", "Node.js", "MongoDB", "AWS"],
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
    description:
      "An excellent opportunity for junior developers to work with modern frontend technologies.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
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
    description:
      "Build responsive React applications and collaborate with designers and backend engineers.",
    skills: ["React", "Redux", "JavaScript", "REST API"],
  },
  {
    id: 7,
    title: "Product Designer",
    company: "Flipkart",
    location: "Bangalore, India",
    salary: "₹10L - ₹18L",
    type: "Full Time",
    experience: "2-5 Years",
    mode: "Hybrid",
    description:
      "Design engaging product experiences and work closely with product and engineering teams.",
    skills: ["Figma", "UX", "UI", "Design Systems"],
  },
  {
    id: 8,
    title: "Node.js Backend Developer",
    company: "Wipro",
    location: "Delhi, India",
    salary: "₹9L - ₹16L",
    type: "Full Time",
    experience: "2-5 Years",
    mode: "Remote",
    description:
      "Develop robust backend APIs and services using Node.js and modern cloud technologies.",
    skills: ["Node.js", "Express", "MongoDB", "REST API"],
  },
];

export default function FindJobs() {
  const [search, setSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  const [jobType, setJobType] = useState("All");
  const [workMode, setWorkMode] = useState("All");
  const [experience, setExperience] = useState("All");

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("Newest");

  const [savedJobIds, setSavedJobIds] = useState<number[]>([]);

  // =========================================================
  // LOAD SAVED JOBS FROM LOCAL STORAGE
  // =========================================================

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      console.log("Saved jobs from localStorage:", saved);

      if (!saved) {
        setSavedJobIds([]);
        return;
      }

      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        const validIds = parsed
          .map(Number)
          .filter((id) =>
            jobs.some((job) => job.id === id)
          );

        setSavedJobIds(validIds);
      }
    } catch (error) {
      console.error("Error loading saved jobs:", error);
      setSavedJobIds([]);
    }
  }, []);

  // =========================================================
  // SAVE / UNSAVE JOB
  // =========================================================

  const toggleSaveJob = (jobId: number) => {
    try {
      const currentSaved =
        localStorage.getItem(STORAGE_KEY);

      let savedIds: number[] = [];

      if (currentSaved) {
        const parsed = JSON.parse(currentSaved);

        if (Array.isArray(parsed)) {
          savedIds = parsed.map(Number);
        }
      }

      let updatedIds: number[];

      if (savedIds.includes(jobId)) {
        // REMOVE JOB
        updatedIds = savedIds.filter(
          (id) => id !== jobId
        );

        console.log("Job removed:", jobId);
      } else {
        // SAVE JOB
        updatedIds = [
          ...savedIds,
          jobId,
        ];

        console.log("Job saved:", jobId);
      }

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedIds)
      );

      setSavedJobIds(updatedIds);

      console.log(
        "Updated localStorage:",
        localStorage.getItem(STORAGE_KEY)
      );
    } catch (error) {
      console.error(
        "Error saving job:",
        error
      );
    }
  };

  // =========================================================
  // FILTER JOBS
  // =========================================================

  const filteredJobs = jobs.filter((job) => {
    const searchText = `
      ${job.title}
      ${job.company}
      ${job.location}
      ${job.description}
      ${job.skills.join(" ")}
    `.toLowerCase();

    const matchesSearch =
      search.trim() === "" ||
      searchText.includes(
        search.toLowerCase().trim()
      );

    const matchesLocation =
      locationSearch.trim() === "" ||
      job.location
        .toLowerCase()
        .includes(
          locationSearch.toLowerCase().trim()
        );

    const matchesType =
      jobType === "All" ||
      job.type === jobType;

    const matchesMode =
      workMode === "All" ||
      job.mode === workMode;

    const matchesExperience =
      experience === "All" ||
      job.experience === experience;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesMode &&
      matchesExperience
    );
  });

  // =========================================================
  // SORT
  // =========================================================

  const sortedJobs = [...filteredJobs].sort(
    (a, b) => {
      if (sortBy === "Job Title") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "Company") {
        return a.company.localeCompare(b.company);
      }

      return a.id - b.id;
    }
  );

  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const clearFilters = () => {
    setSearch("");
    setLocationSearch("");
    setJobType("All");
    setWorkMode("All");
    setExperience("All");
    setSortBy("Newest");
  };

  return (
    <div className="space-y-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Find Jobs
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Discover your next career opportunity.
        </p>
      </div>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_auto]">

          {/* JOB SEARCH */}

          <div className="relative">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Job title, skills or company"
              className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />

          </div>

          {/* LOCATION */}

          <div className="relative">

            <MapPin
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={locationSearch}
              onChange={(e) =>
                setLocationSearch(
                  e.target.value
                )
              }
              placeholder="City, state or remote"
              className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />

          </div>

          {/* FILTER BUTTON */}

          <button
            type="button"
            onClick={() =>
              setShowFilters(!showFilters)
            }
            className="flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>

        </div>

        {/* ===================================================
            FILTERS
        =================================================== */}

        {showFilters && (
          <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              <FilterSelect
                label="Job Type"
                value={jobType}
                setValue={setJobType}
                options={[
                  "All",
                  "Full Time",
                  "Part Time",
                  "Contract",
                  "Internship",
                ]}
              />

              <FilterSelect
                label="Work Mode"
                value={workMode}
                setValue={setWorkMode}
                options={[
                  "All",
                  "Remote",
                  "Hybrid",
                  "On-site",
                ]}
              />

              <FilterSelect
                label="Experience"
                value={experience}
                setValue={setExperience}
                options={[
                  "All",
                  "0-2 Years",
                  "2-5 Years",
                  "5+ Years",
                ]}
              />

            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 flex items-center gap-2 text-sm font-medium text-red-500"
            >
              <X size={16} />
              Clear Filters
            </button>

          </div>
        )}

      </div>

      {/* =====================================================
          RESULTS
      ===================================================== */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <p className="text-sm text-gray-500 dark:text-gray-400">

          <span className="font-semibold text-gray-800 dark:text-white">
            {sortedJobs.length}
          </span>{" "}
          jobs found

        </p>

        <div className="relative">

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="h-10 appearance-none rounded-lg border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          >

            <option value="Newest">
              Sort: Newest
            </option>

            <option value="Job Title">
              Sort: Job Title
            </option>

            <option value="Company">
              Sort: Company
            </option>

          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

        </div>

      </div>

      {/* =====================================================
          JOBS
      ===================================================== */}

      {sortedJobs.length > 0 ? (

        <div className="space-y-4">

          {sortedJobs.map((job) => (

            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobIds.includes(
                job.id
              )}
              onToggleSave={toggleSaveJob}
            />

          ))}

        </div>

      ) : (

        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center dark:border-gray-800 dark:bg-white/[0.03]">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">

            <Search
              size={28}
              className="text-gray-400"
            />

          </div>

          <h3 className="mt-5 text-lg font-semibold text-gray-800 dark:text-white">
            No jobs found
          </h3>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Try changing your search or filters.
          </p>

          <button
            onClick={clearFilters}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Clear Filters
          </button>

        </div>

      )}

    </div>
  );
}

// =========================================================
// JOB CARD
// =========================================================

function JobCard({
  job,
  isSaved,
  onToggleSave,
}: {
  job: Job;
  isSaved: boolean;
  onToggleSave: (jobId: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">

      {/* TOP */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex min-w-0 gap-4">

          {/* COMPANY LOGO */}

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600 dark:bg-blue-500/10">
            {job.company.charAt(0)}
          </div>

          {/* JOB INFO */}

          <div className="min-w-0">

            <h2 className="text-base font-semibold text-gray-800 dark:text-white">
              {job.title}
            </h2>

            <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
              {job.company}
            </p>

            <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">

              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {job.location}
              </span>

              <span className="flex items-center gap-1">
                <Briefcase size={14} />
                {job.type}
              </span>

              <span>
                {job.mode}
              </span>

            </div>

          </div>

        </div>

        {/* =================================================
            SAVE BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() =>
            onToggleSave(job.id)
          }
          title={
            isSaved
              ? "Remove saved job"
              : "Save job"
          }
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition ${
            isSaved
              ? "border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400"
              : "border-gray-200 text-gray-400 hover:border-blue-200 hover:text-blue-600 dark:border-gray-700"
          }`}
        >

          <Bookmark
            size={20}
            fill={
              isSaved
                ? "currentColor"
                : "none"
            }
          />

        </button>

      </div>

      {/* DESCRIPTION */}

      <p className="mt-4 text-sm leading-6 text-gray-500 dark:text-gray-400">
        {job.description}
      </p>

      {/* SKILLS */}

      <div className="mt-4 flex flex-wrap gap-2">

        {job.skills.map((skill) => (

          <span
            key={skill}
            className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
          >
            {skill}
          </span>

        ))}

      </div>

      {/* DETAILS */}

      <div className="mt-5 flex flex-wrap gap-8 border-t border-gray-100 pt-4 dark:border-gray-800">

        <div>

          <p className="text-xs text-gray-400">
            Salary
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-700 dark:text-gray-200">
            {job.salary}
          </p>

        </div>

        <div>

          <p className="text-xs text-gray-400">
            Experience
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-700 dark:text-gray-200">
            {job.experience}
          </p>

        </div>

        <div>

          <p className="text-xs text-gray-400">
            Work Mode
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-700 dark:text-gray-200">
            {job.mode}
          </p>

        </div>

      </div>

      {/* ACTIONS */}

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">

        <Link
          to={`/job-details/${job.id}`}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Eye size={16} />
          View Details
        </Link>

        <Link
          to={`/apply-job/${job.id}`}
          className="flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Send size={16} />
          Apply Now
        </Link>

      </div>

    </div>
  );
}

// =========================================================
// FILTER SELECT
// =========================================================

function FilterSelect({
  label,
  value,
  setValue,
  options,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  options: string[];
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <div className="relative">

        <select
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-600 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
        >

          {options.map((option) => (

            <option
              key={option}
              value={option}
            >
              {option}
            </option>

          ))}

        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

      </div>

    </div>
  );
}