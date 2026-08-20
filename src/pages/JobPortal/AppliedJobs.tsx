import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  Search,
  MapPin,
  Briefcase,
  CalendarDays,
  ChevronDown,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";

type ApplicationStatus =
  | "Submitted"
  | "Under Review"
  | "Shortlisted"
  | "Interview"
  | "Rejected";

type Application = {
  id: number;
  jobId: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  mode: string;
  appliedDate: string;
  status: ApplicationStatus;
};

const applications: Application[] = [
  {
    id: 1,
    jobId: 1,
    title: "Senior React Developer",
    company: "Microsoft",
    location: "Bangalore, India",
    salary: "₹15L - ₹22L",
    type: "Full Time",
    mode: "Hybrid",
    appliedDate: "Aug 11, 2026",
    status: "Submitted",
  },
  {
    id: 2,
    jobId: 2,
    title: "Frontend Developer",
    company: "Google",
    location: "Hyderabad, India",
    salary: "₹12L - ₹20L",
    type: "Full Time",
    mode: "On-site",
    appliedDate: "Aug 8, 2026",
    status: "Under Review",
  },
  {
    id: 3,
    jobId: 4,
    title: "Full Stack Developer",
    company: "Amazon",
    location: "Chennai, India",
    salary: "₹14L - ₹24L",
    type: "Full Time",
    mode: "Hybrid",
    appliedDate: "Aug 5, 2026",
    status: "Shortlisted",
  },
  {
    id: 4,
    jobId: 6,
    title: "React Developer",
    company: "Accenture",
    location: "Mumbai, India",
    salary: "₹8L - ₹15L",
    type: "Contract",
    mode: "Remote",
    appliedDate: "Aug 2, 2026",
    status: "Interview",
  },
  {
    id: 5,
    jobId: 5,
    title: "Junior Frontend Developer",
    company: "Infosys",
    location: "Pune, India",
    salary: "₹5L - ₹8L",
    type: "Full Time",
    mode: "On-site",
    appliedDate: "Jul 28, 2026",
    status: "Rejected",
  },
];

const statusOptions = [
  "All",
  "Submitted",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Rejected",
];

export default function AppliedJobs() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const filteredApplications = useMemo(() => {
    let result = applications.filter((application) => {
      const searchText = `
        ${application.title}
        ${application.company}
        ${application.location}
      `.toLowerCase();

      const matchesSearch =
        searchText.includes(search.toLowerCase());

      const matchesStatus =
        status === "All" ||
        application.status === status;

      return matchesSearch && matchesStatus;
    });

    if (sortBy === "Company") {
      result = [...result].sort((a, b) =>
        a.company.localeCompare(b.company)
      );
    }

    if (sortBy === "Job Title") {
      result = [...result].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [search, status, sortBy]);

  const getStatusCount = (currentStatus: string) => {
    if (currentStatus === "All") {
      return applications.length;
    }

    return applications.filter(
      (application) =>
        application.status === currentStatus
    ).length;
  };

  return (
    <div className="space-y-6">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Applied Jobs
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Track and manage all the jobs you have applied for.
        </p>
      </div>

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <SummaryCard
          title="Total Applications"
          value={applications.length}
          icon={<FileText size={20} />}
        />

        <SummaryCard
          title="Under Review"
          value={
            applications.filter(
              (item) => item.status === "Under Review"
            ).length
          }
          icon={<Clock size={20} />}
        />

        <SummaryCard
          title="Shortlisted"
          value={
            applications.filter(
              (item) => item.status === "Shortlisted"
            ).length
          }
          icon={<CheckCircle2 size={20} />}
        />

        <SummaryCard
          title="Interviews"
          value={
            applications.filter(
              (item) => item.status === "Interview"
            ).length
          }
          icon={<CalendarDays size={20} />}
        />
      </div>

      {/* =====================================================
          SEARCH + SORT
      ===================================================== */}

      <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
          {/* Search */}

          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by job title, company or location..."
              className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Sort */}

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-600 outline-none focus:border-blue-500 md:w-44 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
            >
              <option value="Newest">Newest</option>
              <option value="Job Title">Job Title</option>
              <option value="Company">Company</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          STATUS FILTER
      ===================================================== */}

      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-2">
          {statusOptions.map((option) => {
            const active = status === option;

            return (
              <button
                key={option}
                onClick={() => setStatus(option)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                {option}

                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {getStatusCount(option)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          RESULTS
      ===================================================== */}

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-800 dark:text-white">
            {filteredApplications.length}
          </span>{" "}
          applications
        </p>
      </div>

      {/* =====================================================
          APPLICATION LIST
      ===================================================== */}

      {filteredApplications.length > 0 ? (
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          search={search}
          status={status}
          onClear={() => {
            setSearch("");
            setStatus("All");
          }}
        />
      )}
    </div>
  );
}

/* =========================================================
   APPLICATION CARD
========================================================= */

function ApplicationCard({
  application,
}: {
  application: Application;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-sm dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-blue-500/30">
      <div className="flex flex-col gap-5">
        {/* Top Section */}

        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            {/* Company Logo */}

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-lg font-bold text-blue-600 dark:bg-blue-500/10">
              {application.company.charAt(0)}
            </div>

            {/* Job Information */}

            <div>
              <h2 className="text-base font-semibold text-gray-800 dark:text-white">
                {application.title}
              </h2>

              <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                {application.company}
              </p>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {application.location}
                </span>

                <span className="flex items-center gap-1">
                  <Briefcase size={14} />
                  {application.type}
                </span>
              </div>
            </div>
          </div>

          {/* Status */}

          <StatusBadge status={application.status} />
        </div>

        {/* Job Details */}

        <div className="grid grid-cols-1 gap-4 border-y border-gray-100 py-4 sm:grid-cols-3 dark:border-gray-800">
          <InfoItem
            label="Salary"
            value={application.salary}
          />

          <InfoItem
            label="Work Mode"
            value={application.mode}
          />

          <InfoItem
            label="Applied On"
            value={application.appliedDate}
          />
        </div>

        {/* Bottom */}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <StatusIcon status={application.status} />

            <span className="text-sm text-gray-600 dark:text-gray-300">
              {getStatusMessage(application.status)}
            </span>
          </div>

          <div className="flex gap-2">
            <Link
              to={`/job-details/${application.jobId}`}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Eye size={16} />
              View Job
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status: ApplicationStatus;
}) {
  const styles: Record<ApplicationStatus, string> = {
    Submitted:
      "bg-orange-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",

    "Under Review":
      "bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400",

    Shortlisted:
      "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400",

    Interview:
      "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",

    Rejected:
      "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  };

  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

/* =========================================================
   STATUS ICON
========================================================= */

function StatusIcon({
  status,
}: {
  status: ApplicationStatus;
}) {
  if (status === "Rejected") {
    return (
      <XCircle
        size={18}
        className="text-red-500"
      />
    );
  }

  if (status === "Shortlisted") {
    return (
      <CheckCircle2
        size={18}
        className="text-green-500"
      />
    );
  }

  if (status === "Interview") {
    return (
      <CalendarDays
        size={18}
        className="text-purple-500"
      />
    );
  }

  if (status === "Under Review") {
    return (
      <Clock
        size={18}
        className="text-yellow-500"
      />
    );
  }

  return (
    <FileText
      size={18}
      className="text-blue-500"
    />
  );
}

/* =========================================================
   STATUS MESSAGE
========================================================= */

function getStatusMessage(
  status: ApplicationStatus
) {
  switch (status) {
    case "Submitted":
      return "Application submitted successfully";

    case "Under Review":
      return "Employer is reviewing your application";

    case "Shortlisted":
      return "Congratulations! You have been shortlisted";

    case "Interview":
      return "Interview process is in progress";

    case "Rejected":
      return "Application was not selected";

    default:
      return "";
  }
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-2xl font-bold text-gray-800 dark:text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {title}
      </p>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  search,
  status,
  onClear,
}: {
  search: string;
  status: string;
  onClear: () => void;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <FileText
          size={24}
          className="text-gray-400"
        />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
        No applications found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
        {search || status !== "All"
          ? "Try changing your search or status filter."
          : "You haven't applied for any jobs yet."}
      </p>

      {search || status !== "All" ? (
        <button
          onClick={onClear}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Clear Filters
        </button>
      ) : (
        <Link
          to="/find-jobs"
          className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Find Jobs
        </Link>
      )}
    </div>
  );
}