import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  ChevronDown,
  Clock,
  Eye,
  FileText,
  Mail,
  MapPin,
  Phone,
  Search,
  User,
  X,
  XCircle,
} from "lucide-react";

const APPLICATIONS_KEY = "jobApplications";

interface Application {
  id: string | number;
  jobId?: string | number;
  jobTitle?: string;
  company?: string;

  name?: string;
  email?: string;
  phone?: string;
  location?: string;

  resume?: string;
  coverLetter?: string;

  appliedAt?: string;
  status?: string;
}

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [search, setSearch] = useState("");
  const [jobFilter, setJobFilter] = useState("All Jobs");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  /* =====================================================
     LOAD APPLICATIONS
  ===================================================== */

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    try {
      const storedApplications =
        localStorage.getItem(APPLICATIONS_KEY);

      console.log(
        "Applications localStorage:",
        storedApplications
      );

      if (!storedApplications) {
        setApplications([]);
        return;
      }

      const parsedApplications = JSON.parse(
        storedApplications
      );

      if (Array.isArray(parsedApplications)) {
        setApplications(parsedApplications);
      } else {
        setApplications([]);
      }
    } catch (error) {
      console.error(
        "Error loading applications:",
        error
      );

      setApplications([]);
    }
  };

  /* =====================================================
     UNIQUE JOBS
  ===================================================== */

  const jobTitles = useMemo(() => {
    const jobs = applications
      .map((application) => application.jobTitle)
      .filter(Boolean) as string[];

    return ["All Jobs", ...Array.from(new Set(jobs))];
  }, [applications]);

  /* =====================================================
     FILTER APPLICATIONS
  ===================================================== */

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        !searchText ||
        application.name
          ?.toLowerCase()
          .includes(searchText) ||
        application.email
          ?.toLowerCase()
          .includes(searchText) ||
        application.jobTitle
          ?.toLowerCase()
          .includes(searchText);

      const matchesJob =
        jobFilter === "All Jobs" ||
        application.jobTitle === jobFilter;

      const applicationStatus =
        application.status || "Pending";

      const matchesStatus =
        statusFilter === "All Status" ||
        applicationStatus === statusFilter;

      return (
        matchesSearch &&
        matchesJob &&
        matchesStatus
      );
    });
  }, [
    applications,
    search,
    jobFilter,
    statusFilter,
  ]);

  /* =====================================================
     UPDATE APPLICATION STATUS
  ===================================================== */

  const updateStatus = (
    applicationId: string | number,
    status: string
  ) => {
    try {
      const updatedApplications =
        applications.map((application) =>
          String(application.id) ===
          String(applicationId)
            ? {
                ...application,
                status,
              }
            : application
        );

      localStorage.setItem(
        APPLICATIONS_KEY,
        JSON.stringify(updatedApplications)
      );

      setApplications(updatedApplications);

      // Update opened application too
      if (selectedApplication) {
        setSelectedApplication({
          ...selectedApplication,
          status,
        });
      }
    } catch (error) {
      console.error(
        "Error updating application:",
        error
      );
    }
  };

  /* =====================================================
     STATUS STYLE
  ===================================================== */

  const getStatusClass = (status?: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";

      case "Shortlisted":
        return "bg-orange-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";

      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";

      case "Interview":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800";

      default:
        return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800";
    }
  };

  /* =====================================================
     STATUS ICON
  ===================================================== */

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "Accepted":
        return <CheckCircle size={15} />;

      case "Rejected":
        return <XCircle size={15} />;

      case "Shortlisted":
        return <CheckCircle size={15} />;

      default:
        return <Clock size={15} />;
    }
  };

  /* =====================================================
     FORMAT DATE
  ===================================================== */

  const formatDate = (date?: string) => {
    if (!date) {
      return "Recently";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  /* =====================================================
     STATISTICS
  ===================================================== */

  const totalApplications =
    applications.length;

  const pendingApplications =
    applications.filter(
      (application) =>
        !application.status ||
        application.status === "Pending"
    ).length;

  const shortlistedApplications =
    applications.filter(
      (application) =>
        application.status === "Shortlisted"
    ).length;

  const acceptedApplications =
    applications.filter(
      (application) =>
        application.status === "Accepted"
    ).length;

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Applications
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage and review applications submitted for
          your jobs.
        </p>
      </div>

      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Total */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Applications
              </p>

              <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {totalApplications}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
              <FileText size={22} />
            </div>

          </div>
        </div>

        {/* Pending */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Pending
              </p>

              <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {pendingApplications}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400">
              <Clock size={22} />
            </div>

          </div>
        </div>

        {/* Shortlisted */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Shortlisted
              </p>

              <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {shortlistedApplications}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
              <CheckCircle size={22} />
            </div>

          </div>
        </div>

        {/* Accepted */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Accepted
              </p>

              <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {acceptedApplications}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
              <CheckCircle size={22} />
            </div>

          </div>
        </div>

      </div>

      {/* =================================================
          FILTERS
      ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* Search */}
          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search applicant or job..."
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />

          </div>

          {/* Job Filter */}
          <div className="relative">

            <select
              value={jobFilter}
              onChange={(e) =>
                setJobFilter(e.target.value)
              }
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {jobTitles.map((job) => (
                <option key={job} value={job}>
                  {job}
                </option>
              ))}
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

          </div>

          {/* Status Filter */}
          <div className="relative">

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="All Status">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Shortlisted">
                Shortlisted
              </option>

              <option value="Interview">
                Interview
              </option>

              <option value="Accepted">
                Accepted
              </option>

              <option value="Rejected">
                Rejected
              </option>
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

          </div>

        </div>

      </div>

      {/* =================================================
          APPLICATIONS
      ================================================= */}

      {filteredApplications.length === 0 ? (

        <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-800">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-700">
            <FileText size={28} />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
            No applications found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
            {applications.length === 0
              ? "Applications submitted by candidates will appear here."
              : "Try changing your search or filters."}
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {filteredApplications.map(
            (application) => {

              const status =
                application.status ||
                "Pending";

              return (
                <div
                  key={application.id}
                  className="rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    {/* Applicant */}
                    <div className="flex items-start gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                        <User size={22} />
                      </div>

                      <div>

                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {application.name ||
                            "Unknown Applicant"}
                        </h3>

                        <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                          {application.jobTitle ||
                            "Job Application"}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">

                          {application.email && (
                            <span className="flex items-center gap-1">
                              <Mail size={13} />
                              {application.email}
                            </span>
                          )}

                          {application.location && (
                            <span className="flex items-center gap-1">
                              <MapPin size={13} />
                              {application.location}
                            </span>
                          )}

                        </div>

                      </div>

                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col items-start gap-3 lg:items-end">

                      <div className="flex flex-wrap items-center gap-3">

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(
                            status
                          )}`}
                        >
                          {getStatusIcon(status)}
                          {status}
                        </span>

                        <span className="text-xs text-gray-400">
                          Applied{" "}
                          {formatDate(
                            application.appliedAt
                          )}
                        </span>

                      </div>

                      <div className="flex flex-wrap gap-2">

                        {/* View */}
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedApplication(
                              application
                            )
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                          <Eye size={15} />
                          View
                        </button>

                        {/* Shortlist */}
                        {status !==
                          "Shortlisted" &&
                          status !== "Rejected" &&
                          status !== "Accepted" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(
                                  application.id,
                                  "Shortlisted"
                                )
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700"
                            >
                              Shortlist
                            </button>
                          )}

                        {/* Accept */}
                        {status !==
                          "Accepted" &&
                          status !== "Rejected" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(
                                  application.id,
                                  "Accepted"
                                )
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700"
                            >
                              <CheckCircle size={15} />
                              Accept
                            </button>
                          )}

                        {/* Reject */}
                        {status !== "Rejected" &&
                          status !== "Accepted" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(
                                  application.id,
                                  "Rejected"
                                )
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700"
                            >
                              <XCircle size={15} />
                              Reject
                            </button>
                          )}

                      </div>

                    </div>

                  </div>

                </div>
              );
            }
          )}

        </div>
      )}

      {/* =================================================
          APPLICATION DETAILS MODAL
      ================================================= */}

      {selectedApplication && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl dark:bg-gray-800">

            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-5 dark:border-gray-700 dark:bg-gray-800">

              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Application Details
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Review candidate information
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedApplication(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* Modal Content */}
            <div className="space-y-6 p-6">

              {/* Candidate */}
              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                  <User size={30} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedApplication.name ||
                      "Unknown Applicant"}
                  </h3>

                  <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">
                    {selectedApplication.jobTitle ||
                      "Job Application"}
                  </p>
                </div>

              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {selectedApplication.email && (
                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">

                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Mail size={15} />
                      Email
                    </div>

                    <p className="mt-1 break-all text-sm font-medium text-gray-900 dark:text-white">
                      {selectedApplication.email}
                    </p>

                  </div>
                )}

                {selectedApplication.phone && (
                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">

                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Phone size={15} />
                      Phone
                    </div>

                    <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                      {selectedApplication.phone}
                    </p>

                  </div>
                )}

              </div>

              {/* Job */}
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">

                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Applied For
                </h4>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {selectedApplication.jobTitle ||
                    "Job"}
                </p>

                {selectedApplication.company && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {selectedApplication.company}
                  </p>
                )}

              </div>

              {/* Cover Letter */}
              {selectedApplication.coverLetter && (
                <div>

                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Cover Letter
                  </h4>

                  <div className="mt-2 rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-600 dark:bg-gray-700/50 dark:text-gray-300">
                    {selectedApplication.coverLetter}
                  </div>

                </div>
              )}

              {/* Resume */}
              {selectedApplication.resume && (
                <div>

                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Resume
                  </h4>

                  <div className="mt-2 rounded-lg border border-gray-200 p-4 dark:border-gray-700">

                    <p className="break-all text-sm text-gray-600 dark:text-gray-300">
                      {selectedApplication.resume}
                    </p>

                  </div>

                </div>
              )}

              {/* Status */}
              <div>

                <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                  Application Status
                </h4>

                <div className="flex flex-wrap gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(
                        selectedApplication.id,
                        "Pending"
                      )
                    }
                    className="rounded-lg border border-yellow-300 px-4 py-2 text-xs font-medium text-yellow-700 hover:bg-yellow-50 dark:border-yellow-700 dark:text-yellow-400 dark:hover:bg-yellow-900/20"
                  >
                    Pending
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(
                        selectedApplication.id,
                        "Shortlisted"
                      )
                    }
                    className="rounded-lg border border-blue-300 px-4 py-2 text-xs font-medium text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20"
                  >
                    Shortlist
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(
                        selectedApplication.id,
                        "Interview"
                      )
                    }
                    className="rounded-lg border border-purple-300 px-4 py-2 text-xs font-medium text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-900/20"
                  >
                    Interview
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(
                        selectedApplication.id,
                        "Accepted"
                      )
                    }
                    className="rounded-lg border border-green-300 px-4 py-2 text-xs font-medium text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900/20"
                  >
                    Accept
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(
                        selectedApplication.id,
                        "Rejected"
                      )
                    }
                    className="rounded-lg border border-red-300 px-4 py-2 text-xs font-medium text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    Reject
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Applications;