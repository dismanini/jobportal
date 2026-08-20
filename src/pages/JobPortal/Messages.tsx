import { useState } from "react";

const messagesData = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    avatar: "RS",
    message:
      "Hello, I wanted to know more about the Frontend Developer position.",
    time: "10:30 AM",
    date: "Today",
    unread: true,
    online: true,
  },
  {
    id: 2,
    name: "Priya Das",
    email: "priya.das@gmail.com",
    avatar: "PD",
    message:
      "Thank you for scheduling the interview. I will be available at the scheduled time.",
    time: "09:45 AM",
    date: "Today",
    unread: true,
    online: false,
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit.kumar@gmail.com",
    avatar: "AK",
    message:
      "I have attached my updated resume for your consideration.",
    time: "Yesterday",
    date: "Yesterday",
    unread: false,
    online: true,
  },
  {
    id: 4,
    name: "Sneha Patel",
    email: "sneha.patel@gmail.com",
    avatar: "SP",
    message:
      "Could you please provide an update regarding my application?",
    time: "Yesterday",
    date: "Yesterday",
    unread: false,
    online: false,
  },
  {
    id: 5,
    name: "Arjun Singh",
    email: "arjun.singh@gmail.com",
    avatar: "AS",
    message:
      "Thank you for the opportunity. I look forward to hearing from you.",
    time: "18 Aug",
    date: "18 Aug",
    unread: false,
    online: false,
  },
];

const conversationMessages = [
  {
    id: 1,
    sender: "candidate",
    text: "Hello, I wanted to know more about the Frontend Developer position.",
    time: "10:25 AM",
  },
  {
    id: 2,
    sender: "company",
    text: "Hello Rahul! Sure. The position is for a Frontend Developer with experience in React and Tailwind CSS.",
    time: "10:27 AM",
  },
  {
    id: 3,
    sender: "candidate",
    text: "That sounds great. I have 3 years of experience working with React.",
    time: "10:29 AM",
  },
  {
    id: 4,
    sender: "candidate",
    text: "Could you please share more details about the interview process?",
    time: "10:30 AM",
  },
];

function Messages() {
  const [selectedMessage, setSelectedMessage] = useState(messagesData[0]);
  const [search, setSearch] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(conversationMessages);

  const filteredMessages = messagesData.filter((message) => {
    const searchText = search.toLowerCase();

    return (
      message.name.toLowerCase().includes(searchText) ||
      message.email.toLowerCase().includes(searchText) ||
      message.message.toLowerCase().includes(searchText)
    );
  });

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const newChatMessage = {
      id: messages.length + 1,
      sender: "company",
      text: newMessage,
      time: "Now",
    };

    setMessages([...messages, newChatMessage]);
    setNewMessage("");
  };

  return (
    <div className="w-full min-w-0 bg-[#f7f3ef] p-4 sm:p-6 lg:p-8">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mb-6">

        <h1 className="text-2xl font-bold text-[#030303] sm:text-3xl">
          Messages
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Communicate with candidates and manage your conversations
        </p>

      </div>

      {/* =====================================================
          MESSAGE CONTAINER
      ====================================================== */}

      <div
        className="
          flex
          min-h-[650px]
          w-full
          min-w-0
          flex-col
          overflow-hidden
          rounded-xl
          border
          border-gray-100
          bg-white
          shadow-sm
          lg:flex-row
        "
      >

        {/* =================================================
            LEFT - CONVERSATIONS
        ================================================== */}

        <div
          className="
            flex
            w-full
            min-w-0
            flex-col
            border-b
            border-gray-100
            lg:w-[360px]
            lg:shrink-0
            lg:border-b-0
            lg:border-r
          "
        >

          {/* Search */}

          <div className="border-b border-gray-100 p-4">

            <div className="relative">

              <input
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  bg-gray-50
                  px-4
                  py-3
                  text-sm
                  outline-none
                  placeholder:text-gray-400
                  focus:border-[#d9692f]
                  focus:bg-white
                  focus:ring-1
                  focus:ring-[#d9692f]
                "
              />

            </div>

          </div>

          {/* Conversation Header */}

          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">

            <h2 className="text-sm font-semibold text-[#030303]">
              Conversations
            </h2>

            <span className="rounded-full bg-[#fff0e7] px-2.5 py-1 text-xs font-semibold text-[#d9692f]">
              {messagesData.filter((item) => item.unread).length} Unread
            </span>

          </div>

          {/* Conversation List */}

          <div className="min-h-0 flex-1 overflow-y-auto">

            {filteredMessages.length > 0 ? (

              filteredMessages.map((message) => (

                <button
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`
                    flex
                    w-full
                    items-start
                    gap-3
                    border-b
                    border-gray-100
                    p-4
                    text-left
                    transition
                    hover:bg-[#fffaf7]
                    ${
                      selectedMessage.id === message.id
                        ? "bg-[#fff7f2]"
                        : "bg-white"
                    }
                  `}
                >

                  {/* Avatar */}

                  <div className="relative shrink-0">

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        bg-[#fff0e7]
                        text-sm
                        font-bold
                        text-[#d9692f]
                      "
                    >
                      {message.avatar}
                    </div>

                    {message.online && (
                      <span
                        className="
                          absolute
                          bottom-0
                          right-0
                          h-3
                          w-3
                          rounded-full
                          border-2
                          border-white
                          bg-green-500
                        "
                      />
                    )}

                  </div>

                  {/* Message Details */}

                  <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-2">

                      <p
                        className={`
                          truncate
                          text-sm
                          ${
                            message.unread
                              ? "font-bold text-[#030303]"
                              : "font-semibold text-gray-700"
                          }
                        `}
                      >
                        {message.name}
                      </p>

                      <span className="shrink-0 text-[11px] text-gray-400">
                        {message.time}
                      </span>

                    </div>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      {message.message}
                    </p>

                    {message.unread && (
                      <span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#d9692f]" />
                    )}

                  </div>

                </button>

              ))

            ) : (

              <div className="p-6 text-center">

                <p className="text-sm font-medium text-gray-500">
                  No conversations found
                </p>

              </div>

            )}

          </div>

        </div>

        {/* =================================================
            RIGHT - CHAT
        ================================================== */}

        <div className="flex min-w-0 flex-1 flex-col">

          {/* Chat Header */}

          <div className="flex items-center justify-between border-b border-gray-100 p-4 sm:p-5">

            <div className="flex min-w-0 items-center gap-3">

              <div className="relative shrink-0">

                <div className="flex h-11 w-11 items-center justify-center
                    rounded-full bg-[#fff0e7] text-sm font-bold text-[#d9692f]" >
                  {selectedMessage.avatar}
                </div>

                {selectedMessage.online && (
                  <span
                    className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2
                      border-white bg-green-500" />
                )}

              </div>

              <div className="min-w-0">

                <h2 className="truncate text-sm font-bold text-[#030303] sm:text-base">
                  {selectedMessage.name}
                </h2>

                <p className="truncate text-xs text-gray-500">
                  {selectedMessage.email}
                </p>

              </div>

            </div>

            {/* Actions */}

            <div className="flex shrink-0 items-center gap-2">

              <button className=" hidden rounded-lg border border-gray-200 px-3
                  py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 sm:block " >
                View Profile
              </button>

              <button className=" flex h-9 w-9 items-center justify-center rounded-lg border
                  border-gray-200 text-gray-500 hover:bg-gray-50 " >
                ⋮
              </button>

            </div>

          </div>

          {/* Candidate Info */}

          <div className=" flex flex-col gap-3 border-b border-gray-100 bg-[#fffaf7] px-4 py-3
              sm:flex-row sm:items-center sm:justify-between sm:px-5 ">

            <div className="min-w-0">

              <p className="text-xs text-gray-400">
                Applied Position
              </p>

              <p className="mt-1 text-sm font-semibold text-[#030303]">
                Frontend Developer
              </p>

            </div>

            <span className="w-fit rounded-full bg-[#fff0e7] px-3 py-1.5 text-xs font-semibold
                text-[#d9692f]">
              Candidate
            </span>

          </div>

          {/* Chat Messages */}

          <div className=" min-h-0 flex-1 overflow-y-auto bg-[#fafafa] p-4 sm:p-6"
          >

            {/* Date */}

            <div className="mb-6 flex items-center justify-center">

              <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] text-gray-500">
                Today
              </span>

            </div>

            <div className="space-y-4">

              {messages.map((message) => {

                const isCompany = message.sender === "company";

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isCompany
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`
                        max-w-[85%]
                        sm:max-w-[70%]
                        ${
                          isCompany
                            ? "items-end"
                            : "items-start"
                        }
                      `}
                    >

                      <div
                        className={`
                          rounded-2xl
                          px-4
                          py-3
                          text-sm
                          leading-6
                          ${
                            isCompany
                              ? "rounded-br-md bg-[#d9692f] text-white"
                              : "rounded-bl-md bg-white text-gray-700 shadow-sm"
                          }
                        `}
                      >
                        {message.text}
                      </div>

                      <p
                        className={`
                          mt-1
                          text-[10px]
                          text-gray-400
                          ${
                            isCompany
                              ? "text-right"
                              : "text-left"
                          }
                        `}
                      >
                        {message.time}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          {/* =================================================
              MESSAGE INPUT
          ================================================== */}

          <div className="border-t border-gray-100 bg-white p-4">

            <div className="flex items-end gap-2">

              <button
                className=" hidden h-11 w-11 shrink-0 items-center justify-center rounded-lg
                  border border-gray-200 text-lg text-gray-500 hover:bg-gray-50 sm:flex "
                title="Attach file" >
                +
              </button>

              <textarea
                rows={1}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Type your message..."
                className=" max-h-32 min-h-[44px] flex-1 resize-none rounded-lg
                  border border-gray-200 px-4 py-3 text-sm outline-none placeholder:text-gray-400
                  focus:border-[#d9692f] focus:ring-1 focus:ring-[#d9692f] " />

              <button
                onClick={sendMessage}
                className="flex h-11 shrink-0 items-center justify-center
                  rounded-lg bg-[#d9692f] px-4 text-sm font-semibold
                  text-white transition hover:bg-[#b95523] sm:px-5 " >
                Send
              </button>

            </div>

            <p className="mt-2 hidden text-[11px] text-gray-400 sm:block">
              Press Enter to send · Shift + Enter for a new line
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Messages;