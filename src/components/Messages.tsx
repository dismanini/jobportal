import React, { useEffect, useState } from "react";
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

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] =
    useState<Message | null>(null);

  const fetchMessages = async () => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        return;
      }

      const user = JSON.parse(storedUser);

      const response = await axios.get(
        `http://localhost:5000/api/messages/admin/${user.id}`
      );

      if (response.data.success) {
        setMessages(response.data.messages || []);
      }
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const openMessage = async (message: Message) => {
    setSelectedMessage(message);

    if (message.status === "unread") {
      try {
        await axios.put(
          `http://localhost:5000/api/messages/${message.id}/read`
        );

        setMessages((previousMessages) =>
          previousMessages.map((item) =>
            item.id === message.id
              ? { ...item, status: "read" }
              : item
          )
        );
      } catch (error) {
        console.error(
          "Error marking message as read:",
          error
        );
      }
    }
  };

  const deleteMessage = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/messages/${id}`
      );

      setMessages((previousMessages) =>
        previousMessages.filter(
          (message) => message.id !== id
        )
      );

      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error(
        "Error deleting message:",
        error
      );
    }
  };

  const unreadCount = messages.filter(
    (message) => message.status === "unread"
  ).length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Messages
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Messages received from job seekers
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Messages
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {messages.length}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Unread Messages
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {unreadCount}
          </h2>
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-gray-500">
          Loading messages...
        </div>
      ) : messages.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
          <h2 className="text-lg font-semibold text-gray-700">
            No messages
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            You don't have any messages yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Message List */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-1">
            <div className="border-b border-gray-200 p-4">
              <h2 className="font-semibold text-gray-800">
                Inbox
              </h2>
            </div>

            <div>
              {messages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => openMessage(message)}
                  className={`w-full border-b border-gray-100 p-4 text-left transition hover:bg-gray-50 ${
                    selectedMessage?.id === message.id
                      ? "bg-gray-50"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p
                        className={`truncate text-sm ${
                          message.status === "unread"
                            ? "font-bold text-gray-900"
                            : "font-medium text-gray-700"
                        }`}
                      >
                        {message.sender_name}
                      </p>

                      <p className="mt-1 truncate text-sm text-gray-600">
                        {message.subject}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {new Date(
                          message.created_at
                        ).toLocaleString()}
                      </p>
                    </div>

                    {message.status === "unread" && (
                      <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-blue-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Message Details */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-2">
            {!selectedMessage ? (
              <div className="flex min-h-[400px] items-center justify-center p-10 text-center text-gray-500">
                Select a message to read it.
              </div>
            ) : (
              <div>
                {/* Message Header */}
                <div className="flex items-start justify-between border-b border-gray-200 p-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {selectedMessage.subject}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      From:{" "}
                      <span className="font-medium text-gray-700">
                        {selectedMessage.sender_name}
                      </span>
                    </p>

                    <p className="text-sm text-gray-500">
                      {selectedMessage.sender_email}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      {new Date(
                        selectedMessage.created_at
                      ).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      deleteMessage(selectedMessage.id)
                    }
                    className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>

                {/* Message Body */}
                <div className="min-h-[250px] p-6">
                  <p className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;