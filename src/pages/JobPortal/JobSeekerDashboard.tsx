import {
  Briefcase,
  Bookmark,
  FileText,
  Calendar,
  Search,
  MapPin,
  Clock,
  ArrowUpRight,
} from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "Microsoft",
    location: "Bangalore, India",
    salary: "₹15L - ₹22L",
    type: "Full Time",
    skills: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Google",
    location: "Hyderabad, India",
    salary: "₹12L - ₹20L",
    type: "Full Time",
    skills: ["React", "JavaScript", "CSS"],
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Adobe",
    location: "Remote",
    salary: "₹8L - ₹14L",
    type: "Full Time",
    skills: ["Figma", "UI Design", "UX"],
  },
];

export default function JobSeekerDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Welcome back, Job Seeker 👋
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Find your next career opportunity.
        </p>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Job title, skills or keywords"
              className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-12 pr-4 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div className="relative">
            <MapPin
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Location"
              className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-12 pr-4 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <button className="h-12 rounded-lg bg-orange-600 px-6 font-medium text-white transition hover:bg-blue-700">
            Search Jobs
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Briefcase size={22} />}
          title="Applied Jobs"
          value="24"
          description="+4 this month"
        />

        <StatCard
          icon={<Bookmark size={22} />}
          title="Saved Jobs"
          value="12"
          description="+3 this week"
        />

        <StatCard
          icon={<FileText size={22} />}
          title="Profile Views"
          value="86"
          description="+12% this month"
        />

        <StatCard
          icon={<Calendar size={22} />}
          title="Interviews"
          value="3"
          description="2 upcoming"
        />
      </div>

      {/* Recommended Jobs */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-800">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Recommended Jobs
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Jobs matching your profile
            </p>
          </div>

          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View All
          </button>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-6 transition hover:bg-gray-50 dark:hover:bg-white/[0.02]"
            >
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                <div className="flex gap-4">
                  {/* Company Logo */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600 dark:bg-blue-500/10">
                    {job.company.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {job.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {job.company}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {job.location}
                      </span>

                      <span>💰 {job.salary}</span>

                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {job.type}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                    Save
                  </button>

                  <button className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    View Job
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Status */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Recent Applications
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200 text-left dark:border-gray-800">
                <th className="px-6 py-4 text-sm font-medium text-gray-500">
                  Job
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500">
                  Company
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500">
                  Applied
                </th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-white">
                  React Developer
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  Amazon
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  Aug 10, 2026
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600 dark:bg-green-500/10">
                    Shortlisted
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-white">
                  Frontend Engineer
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  Infosys
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  Aug 08, 2026
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-600 dark:bg-yellow-500/10">
                    Under Review
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10">
        {icon}
      </div>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {title}
      </p>

      <div className="mt-1 flex items-end justify-between">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          {value}
        </h3>

        <span className="text-xs font-medium text-green-600">
          {description}
        </span>
      </div>
    </div>
  );
}