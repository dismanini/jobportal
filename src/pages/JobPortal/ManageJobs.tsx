import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  CalendarDays,
  Edit3,
  Eye,
  MapPin,
  Plus,
  Search,
  Trash2,
  Users,
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

export default function ManageJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("All");
  const [deleteJob, setDeleteJob] = useState<Job | null>(null);

  // ==========================================
  // LOAD JOBS
  // ==========================================

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {
    try {
      const storedJobs = localStorage.getItem(POSTED_JOBS_KEY);

      if (!storedJobs) {
        setJobs([]);
        return;
      }

      const parsedJobs = JSON.parse(storedJobs);

      if (Array.isArray(parsedJobs)) {
        setJobs(parsedJobs);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Error loading posted jobs:", error);
      setJobs([]);
    }
  };

  // ==========================================
  // FILTER JOBS
  // ==========================================

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        job.title.toLowerCase().includes(search) ||
        job.company.toLowerCase().includes(search) ||
        job.location.toLowerCase().includes(search);

      const matchesType =
        jobType === "All" || job.type === jobType;

      return matchesSearch && matchesType;
    });
  }, [jobs, searchTerm, jobType]);

  // ==========================================
  // DELETE JOB
  // ==========================================

  const confirmDelete = () => {
    if (!deleteJob) return;

    const updatedJobs = jobs.filter(
      (job) => job.id !== deleteJob.id
    );

    localStorage.setItem(
      POSTED_JOBS_KEY,
      JSON.stringify(updatedJobs)
    );

    setJobs(updatedJobs);
    setDeleteJob(null);
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date: string) => {
    if (!date) return "Recently";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Recently";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // VIEW JOB
  // ==========================================

  const handleView = (job: Job) => {
    navigate(`/job-details/${job.id}`);
  };

  // ==========================================
  // EDIT JOB
  // ==========================================

  const handleEdit = (job: Job) => {
    navigate(`/edit-job/${job.id}`);
  };

  return (
    <div className="space-y-6">

      {/* ====================================== */}
      {/* HEADER */}
      {/* ====================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manage Jobs
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage all the jobs you have posted.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/post-job")}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />

          Post New Job
        </button>

      </div>

      {/* ====================================== */}
      {/* STATISTICS */}
      {/* ====================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Total Jobs */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Jobs
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {jobs.length}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20">
              <BriefcaseBusiness size={21} />
            </div>

          </div>

        </div>

        {/* Active Jobs */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Active Jobs
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {jobs.length}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-900/20">
              <BriefcaseBusiness size={21} />
            </div>

          </div>

        </div>

        {/* Applications */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Applications
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                0
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-900/20">
              <Users size={21} />
            </div>

          </div>

        </div>

      </div>

      {/* ====================================== */}
      {/* SEARCH + FILTER */}
      {/* ====================================== */}

      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">

        <div className="flex flex-col gap-3 md:flex-row">

          {/* Search */}
          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search jobs, company or location..."
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={17} />
              </button>
            )}

          </div>

          {/* Filter */}
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="All">
              All Job Types
            </option>

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

      </div>

      {/* ====================================== */}
      {/* EMPTY STATE */}
      {/* ====================================== */}

      {jobs.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-800">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20">
            <BriefcaseBusiness size={28} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
            No jobs posted yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
            You haven't posted any jobs yet. Create your first
            job posting to start finding candidates.
          </p>

          <button
            type="button"
            onClick={() => navigate("/post-job")}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus size={18} />

            Post Your First Job
          </button>

        </div>
      )}

      {/* ====================================== */}
      {/* NO SEARCH RESULTS */}
      {/* ====================================== */}

      {jobs.length > 0 &&
        filteredJobs.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">

            <Search
              size={32}
              className="mx-auto text-gray-400"
            />

            <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              No jobs found
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Try changing your search or filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setJobType("All");
              }}
              className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Clear Filters
            </button>

          </div>
        )}

      {/* ====================================== */}
      {/* JOB LIST */}
      {/* ====================================== */}

      {filteredJobs.length > 0 && (
        <div className="space-y-4">

          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            >

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                {/* Job Info */}
                <div className="flex min-w-0 gap-4">

                  {/* Logo */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-blue-600 dark:bg-blue-900/20">
                    {job.company
                      ? job.company.charAt(0).toUpperCase()
                      : "J"}
                  </div>

                  <div className="min-w-0">

                    <h2 className="truncate text-lg font-bold text-gray-900 dark:text-white">
                      {job.title}
                    </h2>

                    <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {job.company}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500 dark:text-gray-400">

                      <span className="flex items-center gap-1.5">
                        <MapPin size={15} />
                        {job.location}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <BriefcaseBusiness size={15} />
                        {job.type}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={15} />
                        {formatDate(job.postedAt)}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">

                  {/* View */}
                  <button
                    type="button"
                    onClick={() => handleView(job)}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <Eye size={17} />

                    View
                  </button>

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => handleEdit(job)}
                    className="flex items-center gap-2 rounded-lg border border-blue-200 px-4 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/20"
                  >
                    <Edit3 size={17} />

                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => setDeleteJob(job)}
                    className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                  >
                    <Trash2 size={17} />

                    Delete
                  </button>

                </div>

              </div>

              {/* Bottom Info */}
              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4 dark:border-gray-700">

                <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                  Active
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  {job.experience}
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  {job.salary}
                </span>

                <span className="ml-auto text-xs text-gray-400">
                  0 Applications
                </span>

              </div>

            </div>
          ))}

        </div>
      )}

      {/* ====================================== */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ====================================== */}

      {deleteJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">

            <div className="flex items-start justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-900/20">
                <Trash2 size={21} />
              </div>

              <button
                type="button"
                onClick={() => setDeleteJob(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>

            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
              Delete Job?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Are you sure you want to delete{" "}
              <strong className="text-gray-700 dark:text-gray-200">
                {deleteJob.title}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() => setDeleteJob(null)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete Job
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}