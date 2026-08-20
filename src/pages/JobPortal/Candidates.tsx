import  { useState } from "react";

const candidatesData = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    position: "Frontend Developer",
    experience: "3 Years",
    location: "Bhubaneswar",
    status: "Shortlisted",
    initials: "RS",
  },
  {
    id: 2,
    name: "Priya Das",
    email: "priya.das@gmail.com",
    position: "UI/UX Designer",
    experience: "4 Years",
    location: "Bangalore",
    status: "Interview",
    initials: "PD",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit.kumar@gmail.com",
    position: "React Developer",
    experience: "2 Years",
    location: "Hyderabad",
    status: "New",
    initials: "AK",
  },
  {
    id: 4,
    name: "Sneha Patel",
    email: "sneha.patel@gmail.com",
    position: "Backend Developer",
    experience: "5 Years",
    location: "Pune",
    status: "Hired",
    initials: "SP",
  },
  {
    id: 5,
    name: "Arjun Singh",
    email: "arjun.singh@gmail.com",
    position: "Full Stack Developer",
    experience: "4 Years",
    location: "Mumbai",
    status: "Rejected",
    initials: "AS",
  },
];

const statusStyles: Record<string, string> = {
  New: "...",
  Shortlisted: "...",
  Interview: "...",
  Hired: "...",
  Rejected: "...",
};

function Candidates() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredCandidates = candidatesData.filter((candidate) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      candidate.name.toLowerCase().includes(searchText) ||
      candidate.email.toLowerCase().includes(searchText) ||
      candidate.position.toLowerCase().includes(searchText) ||
      candidate.location.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      candidate.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full min-w-0 bg-[#f7f3ef] p-4 sm:p-6 lg:p-8">

      {/* ================= HEADER ================= */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="min-w-0">

          <h1 className="text-2xl font-bold text-[#030303] sm:text-3xl">
            Candidates
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage and track all your candidates
          </p>

        </div>

        <button
          className=" w-full rounded-lg bg-[#d9692f]  px-5 py-3
            text-sm font-semibold text-white transition hover:bg-[#b95523] sm:w-auto ">
          + Add Candidate
        </button>

      </div>

      {/* ================= STATISTICS ================= */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Candidates */}

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Total Candidates
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#030303]">
            156
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            All candidates
          </p>

        </div>

        {/* New */}

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            New Candidates
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#d9692f]">
            32
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Recently added
          </p>

        </div>

        {/* Shortlisted */}

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Shortlisted
          </p>

          <h2 className="mt-2 text-2xl font-bold text-[#030303]">
            48
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Selected candidates
          </p>

        </div>

        {/* Hired */}

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Hired
          </p>

          <h2 className="mt-2 text-2xl font-bold text-green-600">
            18
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Successfully hired
          </p>

        </div>

      </div>

      {/* ================= MAIN CARD ================= */}

      <div className="w-full min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

        {/* ================= TOOLBAR ================= */}

        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="min-w-0">

            <h2 className="text-lg font-semibold text-[#030303]">
              All Candidates
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              View and manage candidate applications
            </p>

          </div>

          {/* Search + Filter */}

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">

            <input
              type="text"
              placeholder="Search candidates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5
                text-sm outline-none placeholder:text-gray-400 focus:border-[#d9692f]
                focus:ring-1 focus:ring-[#d9692f] sm:w-64 " />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm
                text-gray-600 outline-none focus:border-[#d9692f] sm:w-40 " >
              <option value="All">
                All Status
              </option>

              <option value="New">
                New
              </option>

              <option value="Shortlisted">
                Shortlisted
              </option>

              <option value="Interview">
                Interview
              </option>

              <option value="Hired">
                Hired
              </option>

              <option value="Rejected">
                Rejected
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
                  Position
                </th>

                <th className="hidden px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 md:table-cell">
                  Experience
                </th>

                <th className="hidden px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 lg:table-cell">
                  Location
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

              {filteredCandidates.length > 0 ? (

                filteredCandidates.map((candidate) => (

                  <tr
                    key={candidate.id}
                    className=" border-b  border-gray-100 transition hover:bg-[#fffaf7] ">

                    {/* Candidate */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full
                            bg-[#fff0e7] text-sm font-bold text-[#d9692f] " >
                          {candidate.initials}
                        </div>

                        <div className="min-w-0">

                          <p className="truncate font-semibold text-[#030303]">
                            {candidate.name}
                          </p>

                          <p className="mt-1 truncate text-xs text-gray-500">
                            {candidate.email}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Position */}

                    <td className="px-5 py-4">

                      <p className="whitespace-nowrap text-sm font-medium text-[#030303]">
                        {candidate.position}
                      </p>

                    </td>

                    {/* Experience */}

                    <td className="hidden whitespace-nowrap px-5 py-4 md:table-cell">

                      <span className="text-sm text-gray-600">
                        {candidate.experience}
                      </span>

                    </td>

                    {/* Location */}

                    <td className="hidden px-5 py-4 lg:table-cell">

                      <span className="whitespace-nowrap text-sm text-gray-600">
                        {candidate.location}
                      </span>

                    </td>

                    {/* Status */}

                    <td className="px-5 py-4">

                      <span
                        className={` inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs
                          font-semibold
                          ${statusStyles[candidate.status]}
                        `}
                      >
                        {candidate.status}
                      </span>

                    </td>

                    {/* Actions */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <button
                          onClick={() =>
                            console.log(
                              "View candidate:",
                              candidate
                            )
                          }
                          className="whitespace-nowrap text-sm  font-semibold text-[#d9692f] hover:underline">
                          View
                        </button>

                        <button
                          onClick={() =>
                            console.log(
                              "Edit candidate:",
                              candidate
                            )
                          }
                          className=" whitespace-nowrap text-sm font-semibold text-gray-500 hover:text-[#030303] "
                        >
                          Edit
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center"
                  >

                    <p className="font-medium text-gray-600">
                      No candidates found
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
              {filteredCandidates.length}
            </span>{" "}

            candidates

          </p>

          <div className="flex gap-2">

            <button
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50" >
              Previous
            </button>

            <button
              className="rounded-lg bg-[#d9692f]  px-3  py-2  text-sm font-semibold  text-white " >
              1
            </button>

            <button
              className="rounded-lg border border-gray-200 px-3  py-2  text-sm text-gray-500 hover:bg-gray-50 ">
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Candidates;