import { useEffect, useState } from "react";
import axios from "axios";

interface Message {
  id: number;
  subject: string;
  message: string;
  status: "unread" | "read";
  created_at: string;

  sender_id: number;
  sender_name: string;
  sender_email: string;

  receiver_id: number;
  receiver_name: string;
  receiver_email: string;
}

const ADMIN_ID = 4;

const JobSeekerMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] =
    useState<Message | null>(null);

  const [showCompose, setShowCompose] = useState(false);

  const [subject, setSubject] = useState("");
  const [messageText, setMessageText] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const userId = user?.id;

  // =========================
  // LOAD MESSAGES
  // =========================
  const loadMessages = async () => {
    try {
      setLoading(true);
      setError("");

      if (!userId) {
        setError("User not found. Please login again.");
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/messages/user/${userId}`
      );

      if (response.data.success) {
        setMessages(response.data.messages || []);
      } else {
        setError(
          response.data.message ||
            "Failed to load messages."
        );
      }
    } catch (error: any) {
      console.error("Load messages error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to connect to messages API."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [userId]);

  // =========================
  // SEND MESSAGE
  // =========================
  const handleSendMessage = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!subject.trim()) {
      setError("Please enter a subject.");
      return;
    }

    if (!messageText.trim()) {
      setError("Please enter your message.");
      return;
    }

    if (!userId) {
      setError("User not found. Please login again.");
      return;
    }

    try {
      setSending(true);

      const response = await axios.post(
        "http://localhost:5000/api/messages",
        {
          sender_id: userId,
          receiver_id: ADMIN_ID,
          subject: subject.trim(),
          message: messageText.trim(),
        }
      );

      if (response.data.success) {
        setSuccess("Message sent successfully.");

        setSubject("");
        setMessageText("");
        setShowCompose(false);

        await loadMessages();
      } else {
        setError(
          response.data.message ||
            "Failed to send message."
        );
      }
    } catch (error: any) {
      console.error("Send message error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to send message."
      );
    } finally {
      setSending(false);
    }
  };

  // =========================
  // UNREAD COUNT
  // =========================
  const unreadCount = messages.filter(
    (item) =>
      item.receiver_id === userId &&
      item.status === "unread"
  ).length;

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">
          Messages
        </h1>

        <p className="mt-4 text-gray-500">
          Loading messages...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Messages
          </h1>

          <p className="mt-1 text-gray-500">
            Communicate with the administrator.
          </p>
        </div>

        <button
          onClick={() => {
            setShowCompose(true);
            setSelectedMessage(null);
            setError("");
            setSuccess("");
          }}
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          + Compose Message
        </button>

      </div>

      {/* SUCCESS */}
      {success && (
        <div className="mb-5 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
          {success}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* STATISTICS */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500">
            Total Messages
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
            {messages.length}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500">
            Unread Messages
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
            {unreadCount}
          </h2>
        </div>

      </div>

      {/* COMPOSE FORM */}
      {showCompose && (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Compose Message
            </h2>

            <button
              onClick={() => {
                setShowCompose(false);
                setError("");
              }}
              className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              ✕
            </button>

          </div>

          <form
            onSubmit={handleSendMessage}
            className="space-y-5"
          >

            {/* TO */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                To
              </label>

              <input
                type="text"
                value="Admin User (admin@gmail.com)"
                disabled
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              />
            </div>

            {/* SUBJECT */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Subject
              </label>

              <input
                type="text"
                value={subject}
                onChange={(e) =>
                  setSubject(e.target.value)
                }
                placeholder="Enter message subject"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>

              <textarea
                value={messageText}
                onChange={(e) =>
                  setMessageText(e.target.value)
                }
                placeholder="Write your message..."
                rows={6}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">

              <button
                type="submit"
                disabled={sending}
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {sending
                  ? "Sending..."
                  : "Send Message"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowCompose(false);
                  setSubject("");
                  setMessageText("");
                  setError("");
                }}
                className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}

      {/* MESSAGE AREA */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* MESSAGE LIST */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 lg:col-span-1">

          <div className="border-b border-gray-200 p-4 dark:border-gray-800">
            <h2 className="font-semibold text-gray-800 dark:text-white">
              Inbox
            </h2>
          </div>

          {messages.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No messages found.
            </div>
          ) : (
            messages.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedMessage(item);
                  setShowCompose(false);
                  setSuccess("");
                  setError("");
                }}
                className={`w-full border-b border-gray-100 p-4 text-left hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 ${
                  selectedMessage?.id === item.id
                    ? "bg-gray-50 dark:bg-gray-800"
                    : ""
                }`}
              >
                <p className="font-semibold text-gray-800 dark:text-white">
                  {item.subject}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {item.sender_id === userId
                    ? `To: ${item.receiver_name}`
                    : `From: ${item.sender_name}`}
                </p>

                <p className="mt-1 truncate text-xs text-gray-400">
                  {item.message}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
                </p>
              </button>
            ))
          )}

        </div>

        {/* MESSAGE DETAILS */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 lg:col-span-2">

          {!selectedMessage ? (
            <div className="flex min-h-[400px] items-center justify-center p-6 text-center text-gray-500">
              Select a message to view details.
            </div>
          ) : (
            <div>

              <div className="border-b border-gray-200 p-5 dark:border-gray-800">

                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {selectedMessage.subject}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  From:{" "}
                  {selectedMessage.sender_id === userId
                    ? "You"
                    : selectedMessage.sender_name}
                </p>

                <p className="text-sm text-gray-500">
                  To:{" "}
                  {selectedMessage.receiver_id === userId
                    ? "You"
                    : selectedMessage.receiver_name}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {new Date(
                    selectedMessage.created_at
                  ).toLocaleString()}
                </p>

              </div>

              <div className="p-6">

                <p className="whitespace-pre-wrap leading-7 text-gray-700 dark:text-gray-300">
                  {selectedMessage.message}
                </p>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default JobSeekerMessages;