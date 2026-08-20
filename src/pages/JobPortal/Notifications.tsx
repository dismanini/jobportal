import { useState } from "react";

type NotificationType =
  | "application"
  | "interview"
  | "candidate"
  | "system"
  | "job";

type Notification = {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  date: string;
  unread: boolean;
};

type FilterType = "All" | "Unread" | "Read";

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "application",
    title: "New Application Received",
    message: "Rahul Sharma has applied for the Frontend Developer position.",
    time: "10 minutes ago",
    date: "Today",
    unread: true,
  },
  {
    id: 2,
    type: "interview",
    title: "Interview Scheduled",
    message: "Interview with Priya Das is scheduled for today at 12:30 PM.",
    time: "1 hour ago",
    date: "Today",
    unread: true,
  },
  {
    id: 3,
    type: "candidate",
    title: "New Candidate Added",
    message: "Amit Kumar has been added to your candidate list.",
    time: "3 hours ago",
    date: "Today",
    unread: true,
  },
  {
    id: 4,
    type: "interview",
    title: "Interview Reminder",
    message: "Your interview with Sneha Patel starts tomorrow at 3:00 PM.",
    time: "Yesterday",
    date: "Yesterday",
    unread: false,
  },
  {
    id: 5,
    type: "application",
    title: "Application Shortlisted",
    message:
      "Arjun Singh has been shortlisted for the Full Stack Developer position.",
    time: "Yesterday",
    date: "Yesterday",
    unread: false,
  },
  {
    id: 6,
    type: "system",
    title: "Profile Updated",
    message: "Your company profile has been successfully updated.",
    time: "2 days ago",
    date: "18 Aug",
    unread: false,
  },
  {
    id: 7,
    type: "job",
    title: "Job Posting Expiring",
    message: "Your Frontend Developer job posting will expire in 3 days.",
    time: "3 days ago",
    date: "17 Aug",
    unread: false,
  },
];

const notificationStyles: Record<
  NotificationType,
  {
    icon: string;
    bg: string;
    text: string;
  }
> = {
  application: {
    icon: "📄",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  interview: {
    icon: "📅",
    bg: "bg-[#fff0e7]",
    text: "text-[#d9692f]",
  },
  candidate: {
    icon: "👤",
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
  system: {
    icon: "⚙",
    bg: "bg-gray-100",
    text: "text-gray-600",
  },
  job: {
    icon: "💼",
    bg: "bg-green-50",
    text: "text-green-600",
  },
};

function Notifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const [filter, setFilter] = useState<FilterType>("All");

  const unreadCount = notifications.filter(
    (notification) => notification.unread,
  ).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "Unread") {
      return notification.unread;
    }

    if (filter === "Read") {
      return !notification.unread;
    }

    return true;
  });

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      })),
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id),
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="w-full min-w-0 bg-[#f7f3ef] p-4 sm:p-6 lg:p-8">
      {/* HEADER */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-[#030303] sm:text-3xl">
            Notifications
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Stay updated with your recruitment activities
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="w-full rounded-lg border border-[#d9692f] bg-white px-5 py-3 text-sm font-semibold text-[#d9692f] transition hover:bg-[#fff7f2] sm:w-auto"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {/* SUMMARY CARDS */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total */}

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Notifications</p>

              <h2 className="mt-2 text-2xl font-bold text-[#030303]">
                {notifications.length}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0e7] text-xl">
              🔔
            </div>
          </div>
        </div>

        {/* Unread */}

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Unread</p>

              <h2 className="mt-2 text-2xl font-bold text-[#d9692f]">
                {unreadCount}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0e7] text-xl">
              ●
            </div>
          </div>
        </div>

        {/* Read */}

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Read</p>

              <h2 className="mt-2 text-2xl font-bold text-green-600">
                {notifications.length - unreadCount}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-xl">
              ✓
            </div>
          </div>
        </div>
      </div>

      {/* NOTIFICATION CARD */}

      <div className="w-full min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        {/* Toolbar */}

        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#030303]">
              Recent Notifications
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Your latest activity and updates
            </p>
          </div>

          {/* Filters */}

          <div className="flex flex-wrap gap-2">
            {(["All", "Unread", "Read"] as FilterType[]).map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  filter === item
                    ? "bg-[#d9692f] text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* NOTIFICATION LIST */}

        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => {
              const style = notificationStyles[notification.type];

              return (
                <div
                  key={notification.id}
                  className={`relative flex gap-4 p-5 transition hover:bg-[#fffaf7] sm:p-6 ${
                    notification.unread ? "bg-[#fffaf7]" : "bg-white"
                  }`}
                >
                  {/* Unread Indicator */}

                  {notification.unread && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-[#d9692f]" />
                  )}

                  {/* Icon */}

                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${style.bg} ${style.text}`}
                  >
                    {style.icon}
                  </div>

                  {/* Content */}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`truncate text-sm ${
                              notification.unread
                                ? "font-bold text-[#030303]"
                                : "font-semibold text-gray-700"
                            }`}
                          >
                            {notification.title}
                          </h3>

                          {notification.unread && (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-[#d9692f]" />
                          )}
                        </div>

                        <p className="mt-1 text-sm leading-6 text-gray-500">
                          {notification.message}
                        </p>
                      </div>

                      <span className="shrink-0 text-xs text-gray-400">
                        {notification.time}
                      </span>
                    </div>

                    {/* Actions */}

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      {notification.unread && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs font-semibold text-[#d9692f] hover:underline"
                        >
                          Mark as read
                        </button>
                      )}

                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-xs font-medium text-gray-400 hover:text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE */

          <div className="px-5 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0e7] text-2xl">
              🔔
            </div>

            <h3 className="mt-4 text-lg font-semibold text-[#030303]">
              No notifications
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
              You don't have any notifications in this section.
            </p>
          </div>
        )}

        {/* FOOTER */}

        {notifications.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-[#030303]">
                {filteredNotifications.length}
              </span>{" "}
              notifications
            </p>

            <button
              onClick={clearAllNotifications}
              className="w-full rounded-lg border border-red-100 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 sm:w-auto"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;