import { useState } from "react";

const interviewsData = [
  {
    id: 1,
    candidate: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    position: "Frontend Developer",
    date: "20 Aug 2026",
    time: "10:00 AM",
    type: "Video Interview",
    interviewer: "John Smith",
    status: "Scheduled",
    initials: "RS",
  },
  {
    id: 2,
    candidate: "Priya Das",
    email: "priya.das@gmail.com",
    position: "UI/UX Designer",
    date: "20 Aug 2026",
    time: "12:30 PM",
    type: "Technical Interview",
    interviewer: "Sarah Wilson",
    status: "Scheduled",
    initials: "PD",
  },
  {
    id: 3,
    candidate: "Amit Kumar",
    email: "amit.kumar@gmail.com",
    position: "React Developer",
    date: "21 Aug 2026",
    time: "11:00 AM",
    type: "HR Interview",
    interviewer: "David Brown",
    status: "Pending",
    initials: "AK",
  },
  {
    id: 4,
    candidate: "Sneha Patel",
    email: "sneha.patel@gmail.com",
    position: "Backend Developer",
    date: "22 Aug 2026",
    time: "03:00 PM",
    type: "Video Interview",
    interviewer: "Michael Lee",
    status: "Completed",
    initials: "SP",
  },
  {
    id: 5,
    candidate: "Arjun Singh",
    email: "arjun.singh@gmail.com",
    position: "Full Stack Developer",
    date: "23 Aug 2026",
    time: "02:00 PM",
    type: "Technical Interview",
    interviewer: "Robert Johnson",
    status: "Cancelled",
    initials: "AS",
  },
];

const statusStyles: Record<string, string> = {
  Scheduled: "...",
  Pending: "...",
  Completed: "...",
  Cancelled: "...",
};

function Interviews() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredInterviews = interviewsData.filter((interview) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      interview.candidate.toLowerCase().includes(searchText) ||
      interview.email.toLowerCase().includes(searchText) ||
      interview.position.toLowerCase().includes(searchText) ||
      interview.interviewer.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      interview.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full min-w-0 bg-[#f7f3ef] p-4 sm:p-6 lg:p-8">

      {/* ================= HEADER ================= */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-[#030303] sm:text-3xl">
            Interviews
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage and track all candidate interviews
          </p>
        </div>

        <button
          className=" w-full rounded-lg bg-[#d9692f] px-5 py-3
            text-sm font-semibold text-white transition hover:bg-[#b95523] sm:w-auto ">
          + Schedule Interview
        </button>

      </div>

      {/* ================= STATISTICS ================= */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Total Interviews
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#030303]">
            24
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            All interviews
          </p>

        </div>

        {/* Scheduled */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Scheduled
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#d9692f]">
            12
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Upcoming interviews
          </p>

        </div>

        {/* Pending */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Pending
          </p>

          <h2 className="mt-2 text-2xl font-bold text-yellow-600">
            7
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Awaiting confirmation
          </p>

        </div>

        {/* Completed */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Completed
          </p>

          <h2 className="mt-2 text-2xl font-bold text-green-600">
            5
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Successfully completed
          </p>

        </div>

      </div>

      {/* ================= MAIN CARD ================= */}

      <div className="w-full min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

        {/* ================= TOOLBAR ================= */}

        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-[#030303]">
              Interview Schedule
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              View and manage candidate interviews
            </p>
          </div>

          {/* Search + Filter */}

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">

            <input
              type="text"
              placeholder="Search interviews..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" w-full rounded-lg border border-gray-200
                bg-white px-4 py-2.5 text-sm outline-none
                placeholder:text-gray-400 focus:border-[#d9692f] focus:ring-1
                focus:ring-[#d9692f] sm:w-64 " />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className=" w-full rounded-lg border border-gray-200
                bg-white px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-[#d9692f] sm:w-40
              "
            >
              <option value="All">
                All Status
              </option>

              <option value="Scheduled">
                Scheduled
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Cancelled">
                Cancelled
              </option>
            </select>

          </div>

        </div>

        {/* ================= TABLE ================= */}

        <div className="w-full overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead>

              <tr className="border-b border-gray-100 bg-gray-50">

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Candidate
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Date
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Time
                </th>

                <th className="hidden px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 md:table-cell">
                  Interview Type
                </th>

                <th className="hidden px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 lg:table-cell">
                  Interviewer
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredInterviews.length > 0 ? (

                filteredInterviews.map((interview) => (

                  <tr
                    key={interview.id}
                    className="border-b border-gray-100 transition hover:bg-[#fffaf7] ">

                    {/* Candidate */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div
                          className=" flex h-10 w-10 shrink-0 items-center
                            justify-center rounded-full bg-[#fff0e7] text-sm font-bold text-[#d9692f] "
                        >
                          {interview.initials}
                        </div>

                        <div className="min-w-0">

                          <p className="truncate font-semibold text-[#030303]">
                            {interview.candidate}
                          </p>

                          <p className="mt-1 truncate text-xs text-gray-500">
                            {interview.email}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Date */}

                    <td className="whitespace-nowrap px-5 py-4">

                      <p className="text-sm font-medium text-[#030303]">
                        {interview.date}
                      </p>

                    </td>

                    {/* Time */}

                    <td className="whitespace-nowrap px-5 py-4">

                      <span className="text-sm text-gray-600">
                        {interview.time}
                      </span>

                    </td>

                    {/* Interview Type */}

                    <td className="hidden px-5 py-4 md:table-cell">

                      <span className="text-sm text-gray-600">
                        {interview.type}
                      </span>

                    </td>

                    {/* Interviewer */}

                    <td className="hidden px-5 py-4 lg:table-cell">

                      <span className="text-sm font-medium text-[#030303]">
                        {interview.interviewer}
                      </span>

                    </td>

                    {/* Status */}

                    <td className="px-5 py-4">

                      <span
                        className={` inline-flex whitespace-nowrap rounded-full
                          px-3 py-1.5 text-xs font-semibold
                          ${statusStyles[interview.status]}
                        `}
                      >
                        {interview.status}
                      </span>

                    </td>

                    {/* Actions */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <button
                          onClick={() =>
                            console.log(
                              "View interview:",
                              interview
                            )
                          }
                          className=" whitespace-nowrap text-sm font-semibold
                            text-[#d9692f] hover:underline " >
                          View
                        </button>

                        <button
                          onClick={() =>
                            console.log(
                              "Edit interview:",
                              interview
                            )
                          }
                          className="whitespace-nowrap text-sm font-semibold text-gray-500
                            hover:text-[#030303] " >
                          Edit
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center"
                  >

                    <p className="font-medium text-gray-600">
                      No interviews found
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      Try changing your search or filter
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* ================= FOOTER ================= */}

        <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm text-gray-500">

            Showing{" "}

            <span className="font-semibold text-[#030303]">
              {filteredInterviews.length}
            </span>{" "}

            interviews

          </p>

          <div className="flex gap-2">

            <button
              className=" rounded-lg border border-gray-200 px-3 py-2 text-sm
                text-gray-500 hover:bg-gray-50 " >
              Previous
            </button>

            <button
              className="rounded-lg bg-[#d9692f] px-3 py-2 text-sm font-semibold text-white " >
              1
            </button>

            <button
              className=" rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500
                hover:bg-gray-50 " >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Interviews;