import React, { useState, useRef } from "react";

import {
  Mic,
  Plus,
  PanelLeft,
  Square,
  SendHorizontal
} from "lucide-react";

const ChatCard = () => {

  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I help you?",
      user: false
    }
  ]);

  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Add Message
  const addMessage = (
    text,
    isUser = true,
    isAudio = false
  ) => {

    setMessages((prev) => [
      ...prev,
      {
        text,
        user: isUser,
        audio: isAudio
      }
    ]);
  };

  // Send Message
  const sendMessage = () => {

    if (!input.trim()) return;

    addMessage(input, true);

    setInput("");

    // Demo Reply
    setTimeout(() => {
      addMessage(
        "This is a demo response.",
        false
      );
    }, 500);
  };

  // Enter Key
  const handleKeyPress = (e) => {

    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Voice Recording
  const handleRecord = async () => {

    if (!recording) {

      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true
        });

      const mediaRecorder =
        new MediaRecorder(stream);

      mediaRecorderRef.current =
        mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {

        const blob = new Blob(
          audioChunksRef.current,
          {
            type: "audio/webm"
          }
        );

        const url =
          URL.createObjectURL(blob);

        addMessage(url, true, true);
      };

      mediaRecorder.start();

      setRecording(true);

    } else {

      mediaRecorderRef.current.stop();

      setRecording(false);
    }
  };

  return (

    <div className="flex h-dvh bg-black text-white overflow-hidden">

      {/* Sidebar */}
      <aside className="hidden sm:flex w-20 border-r border-neutral-800 bg-black flex-col items-center py-4">

        <button className="btn btn-ghost btn-circle text-white">
          <PanelLeft size={22} />
        </button>

      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-6">

          <div className="max-w-3xl mx-auto space-y-6">

            {messages.length === 1 && (

              <div className="flex items-center justify-center h-[60vh]">

                <h1 className="text-2xl sm:text-4xl font-semibold text-center px-4">
                  Ready when you are.
                </h1>

              </div>
            )}

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.user
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[90%] sm:max-w-[75%] px-4 sm:px-5 py-3 rounded-2xl text-sm break-words ${
                    msg.user
                      ? "bg-neutral-800 text-white"
                      : "bg-neutral-900 text-gray-200"
                  }`}
                >

                  {msg.audio ? (

                    <audio
                      controls
                      className="max-w-full"
                    >
                      <source
                        src={msg.text}
                        type="audio/webm"
                      />
                    </audio>

                  ) : (
                    msg.text
                  )}

                </div>

              </div>
            ))}

          </div>
        </div>

        {/* Input Area */}
        <div className="p-3 sm:p-4">

          <div className="max-w-3xl mx-auto">

            <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-full px-2 sm:px-3 py-2 shadow-lg">

              {/* Plus */}
              <button className="btn btn-ghost btn-circle text-gray-400 hover:text-white btn-sm sm:btn-md">

                <Plus size={20} />

              </button>

              {/* Input */}
              <input
                type="text"
                placeholder="Ask anything"
                className="flex-1 bg-transparent outline-none px-2 sm:px-3 text-sm sm:text-base text-white placeholder-gray-500"
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={handleKeyPress}
              />

              {/* Voice */}
              <button
                onClick={handleRecord}
                className={`btn btn-circle btn-sm sm:btn-md border-none ${
                  recording
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >

                {recording ? (
                  <Square size={16} />
                ) : (
                  <Mic size={18} />
                )}

              </button>

              {/* Send */}
              <button
                onClick={sendMessage}
                className="btn btn-circle btn-sm sm:btn-md ml-2 bg-white text-black hover:bg-gray-200 border-none"
              >

                <SendHorizontal size={16} />

              </button>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatCard;