import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DollarSign,
  MapPin,
  Share2,
  Users,
} from "lucide-react";

const STORAGE_KEY = "savedJobs";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  posted: string;
  logo: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
}

const jobs: Job[] = [
  {
    id: 1,
    title: "AI Engineer Lead",
    company: "Mphasis",
    location: "Sunnyvale, CA",
    type: "Full Time",
    experience: "8-10 Years",
    salary: "$50/hr-$55/hr",
    posted: "Posted 1 days ago",
    logo: "M",
    description:
      "We are seeking an experienced AI Engineer Lead with strong AI/ML, enterprise architecture, and hands-on engineering experience to design scalable, modern, and AI-ready systems.",
    responsibilities: [
      "Lead service rationalization and decomposition across complex enterprise ecosystems.",
      "Design and build API-first, event-driven architectures.",
      "Contribute hands-on to domain services, integrations, and POCs",
      "Enable service reuse through catalogs, standards, and governance.",
      "Drive incremental legacy modernization (strangler pattern).",
      "Partner across global teams to influence a platform-first mindset.",
      "Build systems ready for AI agents, automation workflows, and future integrations",
    ],
    requirements: [
      
      "Strong Engineering & Architecture Execution.",
      "Service Decomposition & Enterprise Modernization.",
      "MCP Servers & Gen AI / Agent-Based Systems",
      "Experience designing observability strategies: distributed tracing, structured logging, metrics dashboards",
      "Deep understanding of zero-trust architecture, API security, and identity federation",
    ],
    skills: [
      "Claude Code or similar AI-assisted development tools",
      "Service catalogs and internal developer platforms.",
      "Distributed, multi-region enterprise environments.",
      "AI-driven automation workflows at scale.",
      
    ],
  },
  {
    id: 2,
    title: "FileNet Dev & Support Engineer",
    company: "Mphasis",
    location: "Phoenix, AZ or Charlotte, NC",
    type: "Full Time",
    experience: "2-5 Years",
    salary: "$45–$50/hr",
    posted: "Posted 1 days ago",
    logo: "G",
    description:
      "We are seeking an experienced FileNet Dev & Support Engineer with strong IBM FileNet development, administration, configuration, upgrade, deployment, and production support experience.",
    responsibilities: [
      "Develop, configure, administer, and support IBM FileNet 5.x environments.",
      "Manage FileNet upgrades, deployments, migrations, and production changes.",
      "Perform content mass updates using FileNet APIs and support FileNet Sweep migrations.",
      "Troubleshoot complex distributed-system and production issues.",
      "Implement monitoring, alerting, automation, and cloud transformation initiatives.",
    ],
    requirements: [
      "Strong IBM FileNet 5.x development, administration, and production support.",
      "API and microservices development experience.",
      "Cloud-native technologies and distributed platforms.",
      "Monitoring tools: Splunk, AppDynamics, Prometheus, Grafana.",
      "Experience with Ansible, Terraform, CI/CD, and cloud engineering.",
    ],
    skills: [
      "Splunk",
      "AppDynamics",
      "Prometheus",
      "Grafana",
      "Ansible",
      "Terraform",
    ],
  },
  {
    id: 3,
    title: "IT Analyst II",
    company: "Reflik/Williams",
    location: "Tulsa, OK 74172",
    type: "Full Time",
    experience: "2-4 Years",
    salary: "$50/hour",
    posted: "Posted 1 days ago",
    logo: "A",
    description:
      "We are seeking an experienced IT Analyst II to develop, support, maintain, and enhance software applications while helping optimize business and technical operations.",
    responsibilities: [
      "Develop and support application software.",
      "Analyze, modify, test, debug, and maintain existing applications.",
      "Develop program logic and application components based on business requirements.",
      "Perform systems analysis, design, development, testing, and implementation.",
      "Integrate application components and deliver cost-effective software solutions.",
    ],
    requirements: [
      "High School/GED: 12+ years of IT experience, OR",
      "Associate's Degree: 8+ years of IT experience, OR",
      "Bachelor's Degree in an IT-related field: 5+ years of IT experience..",
      "Strong organizational and interpersonal skills.",
    ],
    skills: [
      "IT experience.",
      "Microsoft Office",
      "PC applications",
      "Wireframing",
      "Prototyping",
    ],
  },
];

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const jobId = Number(id);

  const job = jobs.find((item) => item.id === jobId);

  const [isSaved, setIsSaved] = useState(false);

  // --------------------------------------------------
  // CHECK SAVED JOB
  // --------------------------------------------------

  useEffect(() => {
    const savedJobs = localStorage.getItem(STORAGE_KEY);

    console.log("SavedJobs localStorage:", savedJobs);

    if (!savedJobs) {
      setIsSaved(false);
      return;
    }

    try {
      const savedIds: number[] = JSON.parse(savedJobs).map(Number);

      setIsSaved(savedIds.includes(jobId));
    } catch (error) {
      console.error("Error reading saved jobs:", error);
      setIsSaved(false);
    }
  }, [jobId]);

  // --------------------------------------------------
  // SAVE / UNSAVE JOB
  // --------------------------------------------------

  const handleSaveJob = () => {
    try {
      const savedJobs = localStorage.getItem(STORAGE_KEY);

      let savedIds: number[] = [];

      if (savedJobs) {
        try {
          const parsed = JSON.parse(savedJobs);

          if (Array.isArray(parsed)) {
            savedIds = parsed.map(Number);
          }
        } catch (error) {
          console.error("Could not parse saved jobs:", error);
        }
      }

      if (savedIds.includes(jobId)) {
        // Remove job
        savedIds = savedIds.filter((savedId) => savedId !== jobId);

        setIsSaved(false);

        console.log("Job removed:", jobId);
      } else {
        // Save job
        savedIds.push(jobId);

        setIsSaved(true);

        console.log("Job saved:", jobId);
      }

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(savedIds)
      );

      console.log(
        "Saved jobs after update:",
        localStorage.getItem(STORAGE_KEY)
      );
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  // --------------------------------------------------
  // SHARE JOB
  // --------------------------------------------------

  const handleShare = async () => {
    const shareData = {
      title: job?.title || "Job Opportunity",
      text: `Check out this job: ${job?.title} at ${job?.company}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);

        alert("Job link copied to clipboard!");
      }
    } catch (error) {
      console.log("Share cancelled.");
    }
  };

  // --------------------------------------------------
  // JOB NOT FOUND
  // --------------------------------------------------

  if (!job) {
    return (
      <div className="min-h-[70vh] bg-gray-50 p-6 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-gray-700 dark:bg-gray-800">
          <h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
            Job Not Found
          </h1>

          <p className="mb-6 text-gray-500 dark:text-gray-400">
            The job you are looking for does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/find-jobs")}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* ========================================= */}
        {/* BACK BUTTON */}
        {/* ========================================= */}

        <button
          type="button"
          onClick={() => navigate("/find-jobs")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600 dark:text-gray-300"
        >
          <ArrowLeft size={18} />

          Back to Jobs
        </button>

        {/* ========================================= */}
        {/* JOB HEADER */}
        {/* ========================================= */}

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

            {/* LEFT */}
            <div className="flex gap-5">

              {/* COMPANY LOGO */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-3xl font-bold text-blue-600 dark:bg-blue-900/30">
                {job.logo}
              </div>

              {/* JOB INFORMATION */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                  {job.title}
                </h1>

                <div className="mt-3 flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Building2 size={18} />

                  <span>{job.company}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-500 dark:text-gray-400">

                  <span className="flex items-center gap-2">
                    <MapPin size={17} />
                    {job.location}
                  </span>

                  <span className="flex items-center gap-2">
                    <BriefcaseBusiness size={17} />
                    {job.type}
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock3 size={17} />
                    {job.experience}
                  </span>

                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3">

              {/* SAVE */}
              <button
                type="button"
                onClick={handleSaveJob}
                className={`flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition ${
                  isSaved
                    ? "border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                    : "border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                <Bookmark
                  size={18}
                  fill={isSaved ? "currentColor" : "none"}
                />

                {isSaved ? "Saved" : "Save Job"}
              </button>

              {/* SHARE */}
              <button
                type="button"
                onClick={handleShare}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:border-blue-200 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                title="Share Job"
              >
                <Share2 size={18} />
              </button>

            </div>
          </div>

          {/* ========================================= */}
          {/* JOB TAGS */}
          {/* ========================================= */}

          <div className="mt-7 flex flex-wrap gap-3 border-t border-gray-100 pt-6 dark:border-gray-700">

            <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {job.salary}
            </span>

            <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {job.type}
            </span>

            <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {job.posted}
            </span>

            <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              {job.experience}
            </span>

          </div>
        </div>

        {/* ========================================= */}
        {/* MAIN CONTENT */}
        {/* ========================================= */}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* ======================================= */}
          {/* LEFT CONTENT */}
          {/* ======================================= */}

          <div className="space-y-6 lg:col-span-2">

            {/* ABOUT JOB */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 sm:p-8">

              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                About the Job
              </h2>

              <p className="leading-7 text-gray-600 dark:text-gray-300">
                {job.description}
              </p>

            </section>

            {/* RESPONSIBILITIES */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 sm:p-8">

              <h2 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">
                Responsibilities
              </h2>

              <div className="space-y-4">

                {job.responsibilities.map(
                  (responsibility, index) => (
                    <div
                      key={index}
                      className="flex gap-3"
                    >
                      <CheckCircle2
                        size={20}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />

                      <p className="text-gray-600 dark:text-gray-300">
                        {responsibility}
                      </p>
                    </div>
                  )
                )}

              </div>
            </section>

            {/* REQUIREMENTS */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 sm:p-8">

              <h2 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">
                Requirements
              </h2>

              <div className="space-y-4">

                {job.requirements.map(
                  (requirement, index) => (
                    <div
                      key={index}
                      className="flex gap-3"
                    >
                      <CheckCircle2
                        size={20}
                        className="mt-0.5 shrink-0 text-green-600"
                      />

                      <p className="text-gray-600 dark:text-gray-300">
                        {requirement}
                      </p>
                    </div>
                  )
                )}

              </div>
            </section>

            {/* SKILLS */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 sm:p-8">

              <h2 className="mb-5 text-xl font-bold text-gray-900 dark:text-white">
                Required Skills
              </h2>

              <div className="flex flex-wrap gap-3">

                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                  >
                    {skill}
                  </span>
                ))}

              </div>
            </section>
          </div>

          {/* ======================================= */}
          {/* RIGHT SIDEBAR */}
          {/* ======================================= */}

          <div className="space-y-6">

            {/* APPLY CARD */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">

              <button
                type="button"
                onClick={() =>
                  navigate(`/apply-job/${job.id}`)
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Apply for this Job

                <ArrowUpRight size={18} />
              </button>

              <button
                type="button"
                onClick={handleSaveJob}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-5 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <Bookmark
                  size={18}
                  fill={isSaved ? "currentColor" : "none"}
                />

                {isSaved ? "Job Saved" : "Save Job"}
              </button>

            </div>

            {/* JOB OVERVIEW */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">

              <h2 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
                Job Overview
              </h2>

              <div className="space-y-5">

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                    <DollarSign size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Salary
                    </p>

                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                      {job.salary}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                    <BriefcaseBusiness size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Job Type
                    </p>

                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                      {job.type}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                    <Clock3 size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Experience
                    </p>

                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                      {job.experience}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Location
                    </p>

                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                      {job.location}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                    <CalendarDays size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Posted
                    </p>

                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                      {job.posted}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* COMPANY CARD */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">

              <h2 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
                About {job.company}
              </h2>

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-blue-600 dark:bg-blue-900/20">
                  {job.logo}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {job.company}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Technology Company
                  </p>
                </div>

              </div>

              <div className="mt-5 space-y-3 text-sm text-gray-500">

                <p className="flex items-center gap-2">
                  <Users size={16} />
                  10,000+ employees
                </p>

                <p className="flex items-center gap-2">
                  <Building2 size={16} />
                  Technology & Software
                </p>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}