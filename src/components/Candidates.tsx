import React, { useEffect, useState } from "react";
import axios from "axios";

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  location: string | null;
  professional_title: string | null;
  skills: string | null;
  experience: string | null;
  education: string | null;
  profile_image: string | null;
  created_at: string;
}

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCandidates = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/candidates"
      );

      if (response.data.success) {
        setCandidates(response.data.candidates || []);
      }
    } catch (error) {
      console.error("Error loading candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const filteredCandidates = candidates.filter((candidate) => {
    const searchText = search.toLowerCase();

    return (
      candidate.name?.toLowerCase().includes(searchText) ||
      candidate.email?.toLowerCase().includes(searchText) ||
      candidate.professional_title
        ?.toLowerCase()
        .includes(searchText) ||
      candidate.skills?.toLowerCase().includes(searchText) ||
      candidate.location?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Candidates
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage registered job seekers
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search candidates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none focus:border-blue-500 md:w-80"
        />
      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Total Candidates */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Candidates
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {candidates.length}
          </h2>
        </div>

        {/* Search Results */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Search Results
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {filteredCandidates.length}
          </h2>
        </div>

        {/* Job Seekers */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Job Seekers
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {candidates.length}
          </h2>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading candidates...
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="p-10 text-center">
            <h3 className="text-lg font-semibold text-gray-700">
              No candidates found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              No job seekers match your search.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Candidate
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Contact
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Professional Title
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Skills
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Experience
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Location
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredCandidates.map((candidate) => (
                  <tr
                    key={candidate.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    {/* Candidate */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {candidate.profile_image ? (
                          <img
                            src={`http://localhost:5000${candidate.profile_image}`}
                            alt={candidate.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600">
                            {candidate.name
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>
                        )}

                        <div>
                          <p className="font-semibold text-gray-800">
                            {candidate.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            Candidate ID: {candidate.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">
                        {candidate.email}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {candidate.phone || "No phone"}
                      </p>
                    </td>

                    {/* Professional Title */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {candidate.professional_title ||
                        "Not specified"}
                    </td>

                    {/* Skills */}
                    <td className="max-w-[250px] px-6 py-4 text-sm text-gray-700">
                      {candidate.skills || "Not specified"}
                    </td>

                    {/* Experience */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {candidate.experience || "Not specified"}
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {candidate.location || "Not specified"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Candidates;