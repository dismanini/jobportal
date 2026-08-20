import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Bookmark,
  MapPin,
  Briefcase,
  Eye,
  Send,
  Search,
  Trash2,
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

/*
|--------------------------------------------------------------------------
| SAME JOB DATA AS FindJobs.tsx
|--------------------------------------------------------------------------
*/

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
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "JavaScript",
    ],
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
    skills: [
      "React",
      "JavaScript",
      "CSS",
      "HTML",
    ],
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
    skills: [
      "Figma",
      "UI Design",
      "UX Design",
      "Prototyping",
    ],
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
    skills: [
      "React",
      "Node.js",
      "MongoDB",
      "AWS",
    ],
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
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
    ],
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
    skills: [
      "React",
      "Redux",
      "JavaScript",
      "REST API",
    ],
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
    skills: [
      "Figma",
      "UX",
      "UI",
      "Design Systems",
    ],
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
    skills: [
      "Node.js",
      "Express",
      "MongoDB",
      "REST API",
    ],
  },
];

export default function SavedJobs() {
  const [savedJobIds, setSavedJobIds] =
    useState<number[]>([]);

  const [savedJobs, setSavedJobs] =
    useState<Job[]>([]);

  /*
  |--------------------------------------------------------------------------
  | LOAD SAVED JOBS
  |--------------------------------------------------------------------------
  */

  const loadSavedJobs = () => {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY);

      console.log(
        "SavedJobs localStorage:",
        saved
      );

      if (!saved) {
        setSavedJobIds([]);
        setSavedJobs([]);
        return;
      }

      const parsed = JSON.parse(saved);

      if (!Array.isArray(parsed)) {
        setSavedJobIds([]);
        setSavedJobs([]);
        return;
      }

      /*
       * Convert IDs to numbers.
       * This also handles ["1","2"] if they
       * were accidentally stored as strings.
       */

      const ids = parsed.map(Number);

      setSavedJobIds(ids);

      /*
       * Find the complete job information
       * using the saved IDs.
       */

      const matchedJobs = jobs.filter((job) =>
        ids.includes(job.id)
      );

      setSavedJobs(matchedJobs);

      console.log(
        "Matched saved jobs:",
        matchedJobs
      );
    } catch (error) {
      console.error(
        "Error loading saved jobs:",
        error
      );

      setSavedJobIds([]);
      setSavedJobs([]);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | LOAD WHEN PAGE OPENS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadSavedJobs();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | REMOVE ONE JOB
  |--------------------------------------------------------------------------
  */

  const removeSavedJob = (
    jobId: number
  ) => {
    try {
      const updatedIds =
        savedJobIds.filter(
          (id) => id !== jobId
        );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedIds)
      );

      setSavedJobIds(updatedIds);

      setSavedJobs((currentJobs) =>
        currentJobs.filter(
          (job) => job.id !== jobId
        )
      );

      console.log(
        "Removed saved job:",
        jobId
      );
    } catch (error) {
      console.error(
        "Error removing saved job:",
        error
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | REMOVE ALL SAVED JOBS
  |--------------------------------------------------------------------------
  */

  const removeAllSavedJobs = () => {
    try {
      localStorage.removeItem(
        STORAGE_KEY
      );

      setSavedJobIds([]);
      setSavedJobs([]);

      console.log(
        "All saved jobs removed"
      );
    } catch (error) {
      console.error(
        "Error removing saved jobs:",
        error
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | EMPTY STATE
  |--------------------------------------------------------------------------
  */

  if (savedJobs.length === 0) {
    return (
      <div className="space-y-6">

        {/* PAGE HEADER */}

        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Saved Jobs
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Jobs you saved for later.
          </p>
        </div>

        {/* EMPTY CARD */}

        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center dark:border-gray-800 dark:bg-white/[0.03]">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/10">

            <Bookmark
              size={34}
              className="text-blue-600 dark:text-blue-400"
            />

          </div>

          <h2 className="mt-6 text-xl font-semibold text-gray-800 dark:text-white">
            No saved jobs
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
            You haven't saved any jobs yet.
            Browse available jobs and click the
            bookmark icon to save them here.
          </p>

          <Link
            to="/find-jobs"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Search size={17} />
            Find Jobs
          </Link>

        </div>

      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | SAVED JOBS PAGE
  |--------------------------------------------------------------------------
  */

  return (
    <div className="space-y-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Saved Jobs
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {savedJobs.length}{" "}
            {savedJobs.length === 1
              ? "job"
              : "jobs"}{" "}
            saved for later.
          </p>

        </div>

        {/* REMOVE ALL */}

        <button
          type="button"
          onClick={removeAllSavedJobs}
          className="flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
        >
          <Trash2 size={16} />
          Remove All
        </button>

      </div>

      {/* =====================================================
          JOB LIST
      ===================================================== */}

      <div className="space-y-4">

        {savedJobs.map((job) => (

          <div
            key={job.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-sm dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-blue-500/30"
          >

            {/* =================================================
                TOP
            ================================================= */}

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
                      {job.mode}
                    </span>

                  </div>

                </div>

              </div>

              {/* =================================================
                  REMOVE BOOKMARK
              ================================================= */}

              <button
                type="button"
                onClick={() =>
                  removeSavedJob(job.id)
                }
                title="Remove saved job"
                aria-label="Remove saved job"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-600 transition hover:bg-blue-100 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400"
              >
                <Bookmark
                  size={20}
                  fill="currentColor"
                />
              </button>

            </div>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p className="mt-4 text-sm leading-6 text-gray-500 dark:text-gray-400">
              {job.description}
            </p>

            {/* =================================================
                SKILLS
            ================================================= */}

            <div className="mt-4 flex flex-wrap gap-2">

              {job.skills.map(
                (skill) => (

                  <span
                    key={skill}
                    className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {skill}
                  </span>

                )
              )}

            </div>

            {/* =================================================
                DETAILS
            ================================================= */}

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

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">

              {/* VIEW DETAILS */}

              <Link
                to={`/job-details/${job.id}`}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Eye size={16} />
                View Details
              </Link>

              {/* APPLY */}

              <Link
                to={`/apply-job/${job.id}`}
                className="flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Send size={16} />
                Apply Now
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}