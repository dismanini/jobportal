import { useState, type ChangeEvent } from "react";

function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const [company, setCompany] = useState({
    name: "CompuPlus",
    industry: "Staffing & Recruitment",
    email: "hr@yourcompany.com",
    phone: "+91 98765 43210",
    website: "www.yourcompany.com",
    location: "Bhubaneswar, Odisha, India",
    employees: "50 - 100",
    founded: "2020",
    description:
      "We are a professional recruitment and staffing company helping organizations find the right talent and helping job seekers build successful careers.",
  });

 const handleChange = (
  e: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => {
  setCompany({
    ...company,
    [e.target.name]: e.target.value,
  });
};

  
  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="w-full min-w-0 bg-[#f7f3ef] p-4 sm:p-6 lg:p-8">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-[#030303] sm:text-3xl">
            Company Profile
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your company information and profile
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="
            w-full
            rounded-lg
            bg-[#d9692f]
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#b95523]
            sm:w-auto
          "
        >
          {isEditing ? "Cancel Editing" : "Edit Profile"}
        </button>

      </div>

      {/* =====================================================
          COMPANY BANNER
      ====================================================== */}

      <div
        className="
          mb-6
          w-full
          overflow-hidden
          rounded-2xl
          bg-gradient-to-r
          from-[#030303]
          via-[#211713]
          to-[#6b351d]
          p-6
          sm:p-8
        "
      >

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

          {/* Logo */}

         <div
  className="
    flex
    h-24
    w-24
    shrink-0
    items-center
    justify-center
    overflow-hidden
    rounded-2xl
    border-4
    border-[#d9692f]/30
    bg-white
    shadow-lg
  "
>
  <img
    src="public/images/logo/compuplus-logo.png"
    alt="Company Logo"
    className="h-full w-full object-contain p-2"
  />
</div>

          {/* Company Information */}

          <div className="min-w-0">

            <h2 className="truncate text-2xl font-bold text-white sm:text-3xl">
              {company.name}
            </h2>

            <p className="mt-2 text-sm text-gray-300">
              {company.industry}
            </p>

            <p className="mt-1 text-sm text-gray-300">
              📍 {company.location}
            </p>

            <span
              className="
                mt-3
                inline-flex
                rounded-full
                bg-[#d9692f]
                px-3
                py-1.5
                text-xs
                font-semibold
                text-white
              "
            >
              ✓ Verified Company
            </span>

          </div>

        </div>

      </div>

      {/* =====================================================
          EDIT FORM
      ====================================================== */}

      {isEditing ? (

        <div className="w-full rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-6">

            <h2 className="text-lg font-semibold text-[#030303]">
              Edit Company Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update your company profile details
            </p>

          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Company Name */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Company Name
              </label>

              <input
                type="text"
                name="name"
                value={company.name}
                onChange={handleChange}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-[#d9692f]
                  focus:ring-1
                  focus:ring-[#d9692f]
                "
              />
            </div>

            {/* Industry */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Industry
              </label>

              <input
                type="text"
                name="industry"
                value={company.industry}
                onChange={handleChange}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#d9692f]
                  focus:ring-1
                  focus:ring-[#d9692f]
                "
              />
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={company.email}
                onChange={handleChange}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#d9692f]
                  focus:ring-1
                  focus:ring-[#d9692f]
                "
              />
            </div>

            {/* Phone */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={company.phone}
                onChange={handleChange}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#d9692f]
                  focus:ring-1
                  focus:ring-[#d9692f]
                "
              />
            </div>

            {/* Website */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Website
              </label>

              <input
                type="text"
                name="website"
                value={company.website}
                onChange={handleChange}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#d9692f]
                  focus:ring-1
                  focus:ring-[#d9692f]
                "
              />
            </div>

            {/* Location */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={company.location}
                onChange={handleChange}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#d9692f]
                  focus:ring-1
                  focus:ring-[#d9692f]
                "
              />
            </div>

            {/* Employees */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Company Size
              </label>

              <select
                name="employees"
                value={company.employees}
                onChange={handleChange}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#d9692f]
                "
              >
                <option>1 - 10</option>
                <option>11 - 50</option>
                <option>50 - 100</option>
                <option>100 - 500</option>
                <option>500+</option>
              </select>
            </div>

            {/* Founded */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Founded Year
              </label>

              <input
                type="text"
                name="founded"
                value={company.founded}
                onChange={handleChange}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  px-4
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#d9692f]
                  focus:ring-1
                  focus:ring-[#d9692f]
                "
              />
            </div>

          </div>

          {/* Description */}

          <div className="mt-5">

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Company Description
            </label>

            <textarea
              name="description"
              value={company.description}
              onChange={handleChange}
              rows={5}
              className="
                w-full
                resize-none
                rounded-lg
                border
                border-gray-200
                px-4
                py-3
                text-sm
                outline-none
                focus:border-[#d9692f]
                focus:ring-1
                focus:ring-[#d9692f]
              "
            />

          </div>

          {/* Buttons */}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">

            <button
              onClick={handleSave}
              className="
                rounded-lg
                bg-[#d9692f]
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#b95523]
              "
            >
              Save Changes
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="
                rounded-lg
                border
                border-gray-200
                bg-white
                px-6
                py-3
                text-sm
                font-semibold
                text-gray-600
                transition
                hover:bg-gray-50
              "
            >
              Cancel
            </button>

          </div>

        </div>

      ) : (

        /* =====================================================
           PROFILE VIEW
        ====================================================== */

        <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-3">

          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <div className="min-w-0 space-y-6 xl:col-span-2">

            {/* ABOUT COMPANY */}

            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

              <h2 className="text-lg font-semibold text-[#030303]">
                About Company
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                {company.description}
              </p>

            </div>

            {/* COMPANY INFORMATION */}

            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

              <h2 className="mb-5 text-lg font-semibold text-[#030303]">
                Company Information
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Industry */}

                <div>

                  <p className="text-xs font-medium text-gray-400">
                    Industry
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#030303]">
                    {company.industry}
                  </p>

                </div>

                {/* Company Size */}

                <div>

                  <p className="text-xs font-medium text-gray-400">
                    Company Size
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#030303]">
                    {company.employees} Employees
                  </p>

                </div>

                {/* Founded */}

                <div>

                  <p className="text-xs font-medium text-gray-400">
                    Founded
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#030303]">
                    {company.founded}
                  </p>

                </div>

                {/* Location */}

                <div>

                  <p className="text-xs font-medium text-gray-400">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#030303]">
                    {company.location}
                  </p>

                </div>

              </div>

            </div>

            {/* HIRING ACTIVITY */}

            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

              <div className="mb-5">

                <h2 className="text-lg font-semibold text-[#030303]">
                  Hiring Activity
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Overview of your recruitment activity
                </p>

              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

                <div className="rounded-xl bg-[#fff4ec] p-4">

                  <p className="text-2xl font-bold text-[#d9692f]">
                    24
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Open Jobs
                  </p>

                </div>

                <div className="rounded-xl bg-blue-50 p-4">

                  <p className="text-2xl font-bold text-blue-600">
                    156
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Candidates
                  </p>

                </div>

                <div className="rounded-xl bg-yellow-50 p-4">

                  <p className="text-2xl font-bold text-yellow-600">
                    48
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Shortlisted
                  </p>

                </div>

                <div className="rounded-xl bg-green-50 p-4">

                  <p className="text-2xl font-bold text-green-600">
                    18
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Hired
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================== */}

          <div className="min-w-0 space-y-6">

            {/* CONTACT INFORMATION */}

            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

              <h2 className="mb-5 text-lg font-semibold text-[#030303]">
                Contact Information
              </h2>

              {/* Email */}

              <div className="mb-5 flex items-start gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#fff0e7]
                    text-[#d9692f]
                  "
                >
                  ✉
                </div>

                <div className="min-w-0">

                  <p className="text-xs text-gray-400">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm font-medium text-[#030303]">
                    {company.email}
                  </p>

                </div>

              </div>

              {/* Phone */}

              <div className="mb-5 flex items-start gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#fff0e7]
                    text-[#d9692f]
                  "
                >
                  ☎
                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Phone
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#030303]">
                    {company.phone}
                  </p>

                </div>

              </div>

              {/* Website */}

              <div className="mb-5 flex items-start gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#fff0e7]
                    text-[#d9692f]
                  "
                >
                  🌐
                </div>

                <div className="min-w-0">

                  <p className="text-xs text-gray-400">
                    Website
                  </p>

                  <p className="mt-1 break-all text-sm font-medium text-[#d9692f]">
                    {company.website}
                  </p>

                </div>

              </div>

              {/* Location */}

              <div className="flex items-start gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#fff0e7]
                    text-[#d9692f]
                  "
                >
                  📍
                </div>

                <div className="min-w-0">

                  <p className="text-xs text-gray-400">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#030303]">
                    {company.location}
                  </p>

                </div>

              </div>

            </div>

            {/* COMPANY STATUS */}

            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

              <h2 className="mb-5 text-lg font-semibold text-[#030303]">
                Company Status
              </h2>

              <div className="space-y-4">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Profile Status
                  </span>

                  <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                    Active
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Verification
                  </span>

                  <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                    Verified
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Profile Completion
                  </span>

                  <span className="font-semibold text-[#d9692f]">
                    85%
                  </span>

                </div>

                {/* Progress Bar */}

                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">

                  <div
                    className="h-full rounded-full bg-[#d9692f]"
                    style={{ width: "85%" }}
                  />

                </div>

              </div>

            </div>

            {/* QUICK ACTIONS */}

            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

              <h2 className="mb-4 text-lg font-semibold text-[#030303]">
                Quick Actions
              </h2>

              <div className="space-y-2">

                <button
                  onClick={() => setIsEditing(true)}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-lg
                    border
                    border-gray-100
                    px-4
                    py-3
                    text-left
                    text-sm
                    font-medium
                    text-gray-700
                    transition
                    hover:border-[#d9692f]
                    hover:bg-[#fffaf7]
                  "
                >
                  <span>
                    Edit Company Profile
                  </span>

                  <span className="text-[#d9692f]">
                    →
                  </span>

                </button>

                <button
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-lg
                    border
                    border-gray-100
                    px-4
                    py-3
                    text-left
                    text-sm
                    font-medium
                    text-gray-700
                    transition
                    hover:border-[#d9692f]
                    hover:bg-[#fffaf7]
                  "
                >
                  <span>
                    Manage Jobs
                  </span>

                  <span className="text-[#d9692f]">
                    →
                  </span>

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default CompanyProfile;