import { useState } from "react";
import type { ChangeEvent } from "react";

type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  company: string;
};

type NotificationSettings = {
  newApplications: boolean;
  interviewReminders: boolean;
  messages: boolean;
  jobAlerts: boolean;
  emailNotifications: boolean;
};

type NotificationKey = keyof NotificationSettings;

type Preferences = {
  language: string;
  timezone: string;
  dateFormat: string;
};

type SettingsTab =
  | "Profile"
  | "Account"
  | "Notifications"
  | "Security"
  | "Preferences";

function Settings() {
  const [activeTab, setActiveTab] =
    useState<SettingsTab>("Profile");

  const [profile, setProfile] = useState<Profile>({
    firstName: "Admin",
    lastName: "User",
    email: "admin@yourcompany.com",
    phone: "+91 98765 43210",
    jobTitle: "HR Manager",
    company: "Your Company",
  });

  const [notifications, setNotifications] =
    useState<NotificationSettings>({
      newApplications: true,
      interviewReminders: true,
      messages: true,
      jobAlerts: false,
      emailNotifications: true,
    });

  const [preferences, setPreferences] =
    useState<Preferences>({
      language: "English",
      timezone: "India Standard Time (IST)",
      dateFormat: "DD/MM/YYYY",
    });

  const [saved, setSaved] = useState(false);

  const handleProfileChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const toggleNotification = (
    name: NotificationKey,
  ) => {
    setNotifications((current) => ({
      ...current,
      [name]: !current[name],
    }));
  };

  const tabs: {
    name: SettingsTab;
    icon: string;
  }[] = [
    {
      name: "Profile",
      icon: "👤",
    },
    {
      name: "Account",
      icon: "⚙",
    },
    {
      name: "Notifications",
      icon: "🔔",
    },
    {
      name: "Security",
      icon: "🔒",
    },
    {
      name: "Preferences",
      icon: "🌐",
    },
  ];

  const notificationItems: {
    key: NotificationKey;
    title: string;
    description: string;
  }[] = [
    {
      key: "newApplications",
      title: "New Applications",
      description:
        "Get notified when a candidate applies for a job.",
    },
    {
      key: "interviewReminders",
      title: "Interview Reminders",
      description:
        "Receive reminders about upcoming interviews.",
    },
    {
      key: "messages",
      title: "New Messages",
      description:
        "Get notified when candidates send you messages.",
    },
    {
      key: "jobAlerts",
      title: "Job Alerts",
      description:
        "Receive updates about your job postings.",
    },
    {
      key: "emailNotifications",
      title: "Email Notifications",
      description:
        "Receive important updates through email.",
    },
  ];

  return (
    <div className="w-full min-w-0 bg-[#f7f3ef] p-4 sm:p-6 lg:p-8">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#030303] sm:text-3xl">
          Settings
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your account, preferences and notification
          settings
        </p>
      </div>

      {/* =====================================================
          MAIN SETTINGS
      ====================================================== */}

      <div className="flex w-full min-w-0 flex-col gap-6 lg:flex-row">
        {/* =================================================
            SETTINGS SIDEBAR
        ================================================== */}

        <div className="w-full shrink-0 lg:w-64">
          <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
            {tabs.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`
                  mb-1
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-lg
                  px-4
                  py-3
                  text-left
                  text-sm
                  font-medium
                  transition
                  ${
                    activeTab === item.name
                      ? "bg-[#fff0e7] text-[#d9692f]"
                      : "text-gray-600 hover:bg-gray-50"
                  }
                `}
              >
                <span className="text-base">
                  {item.icon}
                </span>

                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* =================================================
            SETTINGS CONTENT
        ================================================== */}

        <div className="min-w-0 flex-1">
          {/* =================================================
              PROFILE
          ================================================== */}

          {activeTab === "Profile" && (
            <div className="space-y-6">
              {/* Profile Header */}

              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  {/* Profile Image */}

                  <div
                    className="
                      flex
                      h-20
                      w-20
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#030303]
                      text-2xl
                      font-bold
                      text-[#d9692f]
                    "
                  >
                    AU
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-[#030303]">
                      Profile Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Update your personal information
                    </p>

                    <button
                      type="button"
                      className="
                        mt-3
                        rounded-lg
                        border
                        border-[#d9692f]
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        text-[#d9692f]
                        hover:bg-[#fff7f2]
                      "
                    >
                      Change Photo
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Form */}

              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="mb-5 text-lg font-semibold text-[#030303]">
                  Personal Details
                </h2>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* First Name */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      First Name
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleProfileChange}
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

                  {/* Last Name */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Last Name
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleProfileChange}
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
                      value={profile.email}
                      onChange={handleProfileChange}
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
                      value={profile.phone}
                      onChange={handleProfileChange}
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

                  {/* Job Title */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Job Title
                    </label>

                    <input
                      type="text"
                      name="jobTitle"
                      value={profile.jobTitle}
                      onChange={handleProfileChange}
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

                  {/* Company */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Company
                    </label>

                    <input
                      type="text"
                      name="company"
                      value={profile.company}
                      onChange={handleProfileChange}
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

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
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
                </div>
              </div>
            </div>
          )}

          {/* =================================================
              ACCOUNT
          ================================================== */}

          {activeTab === "Account" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-lg font-semibold text-[#030303]">
                  Account Settings
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage your account information
                </p>

                <div className="mt-6 space-y-5">
                  {/* Account Email */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Account Email
                    </label>

                    <input
                      type="email"
                      value="admin@yourcompany.com"
                      readOnly
                      className="
                        w-full
                        rounded-lg
                        border
                        border-gray-200
                        bg-gray-50
                        px-4
                        py-3
                        text-sm
                        text-gray-500
                      "
                    />
                  </div>

                  {/* Account Type */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Account Type
                    </label>

                    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                      <div>
                        <p className="text-sm font-semibold text-[#030303]">
                          Company Account
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Recruitment & Staffing
                        </p>
                      </div>

                      <span className="rounded-full bg-[#fff0e7] px-3 py-1 text-xs font-semibold text-[#d9692f]">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delete Account */}

              <div className="rounded-xl border border-red-100 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-lg font-semibold text-red-600">
                  Danger Zone
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Permanently delete your account and all
                  associated data.
                </p>

                <button
                  type="button"
                  className="
                    mt-5
                    rounded-lg
                    border
                    border-red-200
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-red-500
                    hover:bg-red-50
                  "
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {/* =================================================
              NOTIFICATIONS
          ================================================== */}

          {activeTab === "Notifications" && (
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-semibold text-[#030303]">
                Notification Settings
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Choose which notifications you want to receive
              </p>

              <div className="mt-6 divide-y divide-gray-100">
                {notificationItems.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between gap-4 py-5"
                  >
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-[#030303]">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {item.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        toggleNotification(item.key)
                      }
                      aria-label={`Toggle ${item.title}`}
                      className={`
                        relative
                        h-6
                        w-11
                        shrink-0
                        rounded-full
                        transition
                        ${
                          notifications[item.key]
                            ? "bg-[#d9692f]"
                            : "bg-gray-300"
                        }
                      `}
                    >
                      <span
                        className={`
                          absolute
                          top-1
                          h-4
                          w-4
                          rounded-full
                          bg-white
                          shadow
                          transition
                          ${
                            notifications[item.key]
                              ? "left-6"
                              : "left-1"
                          }
                        `}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================
              SECURITY
          ================================================== */}

          {activeTab === "Security" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-lg font-semibold text-[#030303]">
                  Change Password
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Keep your account secure with a strong password
                </p>

                <div className="mt-6 space-y-5">
                  {/* Current Password */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Current Password
                    </label>

                    <input
                      type="password"
                      placeholder="Enter current password"
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

                  {/* New Password */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      New Password
                    </label>

                    <input
                      type="password"
                      placeholder="Enter new password"
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

                  {/* Confirm Password */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      placeholder="Confirm new password"
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

                <button
                  type="button"
                  onClick={handleSave}
                  className="
                    mt-6
                    rounded-lg
                    bg-[#d9692f]
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    hover:bg-[#b95523]
                  "
                >
                  Update Password
                </button>
              </div>

              {/* Two Factor */}

              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-[#030303]">
                      Two-Factor Authentication
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Add an extra layer of security to your
                      account.
                    </p>
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500">
                    Disabled
                  </span>
                </div>

                <button
                  type="button"
                  className="
                    mt-5
                    rounded-lg
                    border
                    border-[#d9692f]
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-[#d9692f]
                    hover:bg-[#fff7f2]
                  "
                >
                  Enable 2FA
                </button>
              </div>
            </div>
          )}

          {/* =================================================
              PREFERENCES
          ================================================== */}

          {activeTab === "Preferences" && (
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-semibold text-[#030303]">
                Preferences
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Customize your dashboard preferences
              </p>

              <div className="mt-6 space-y-5">
                {/* Language */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Language
                  </label>

                  <select
                    value={preferences.language}
                    onChange={(e) =>
                      setPreferences((current) => ({
                        ...current,
                        language: e.target.value,
                      }))
                    }
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
                      focus:ring-1
                      focus:ring-[#d9692f]
                    "
                  >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Odia</option>
                  </select>
                </div>

                {/* Timezone */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Timezone
                  </label>

                  <select
                    value={preferences.timezone}
                    onChange={(e) =>
                      setPreferences((current) => ({
                        ...current,
                        timezone: e.target.value,
                      }))
                    }
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
                      focus:ring-1
                      focus:ring-[#d9692f]
                    "
                  >
                    <option>
                      India Standard Time (IST)
                    </option>
                    <option>
                      Eastern Standard Time (EST)
                    </option>
                    <option>
                      Pacific Standard Time (PST)
                    </option>
                    <option>
                      Greenwich Mean Time (GMT)
                    </option>
                  </select>
                </div>

                {/* Date Format */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Date Format
                  </label>

                  <select
                    value={preferences.dateFormat}
                    onChange={(e) =>
                      setPreferences((current) => ({
                        ...current,
                        dateFormat: e.target.value,
                      }))
                    }
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
                      focus:ring-1
                      focus:ring-[#d9692f]
                    "
                  >
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="
                  mt-6
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
                Save Preferences
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          SUCCESS MESSAGE
      ====================================================== */}

      {saved && (
        <div
          className="
            fixed
            bottom-5
            right-5
            z-50
            flex
            items-center
            gap-3
            rounded-xl
            bg-[#030303]
            px-5
            py-3
            text-sm
            font-medium
            text-white
            shadow-xl
          "
        >
          <span className="text-green-400">✓</span>

          Settings saved successfully
        </div>
      )}
    </div>
  );
}

export default Settings;