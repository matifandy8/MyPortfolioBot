"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/app/lib/utils";
import Image from "next/image"

interface Message {
  role: "user" | "agent";
  content: string;
  timestamp: string;
}

const initialMessage: Message = {
  role: "agent",
  content: "Hello, I am your personal chatbot for Matías' portfolio. How can I help you today?",
  timestamp: new Date().toLocaleTimeString(),
};

export default function ChatInterface() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([initialMessage]);
    }
  }, []);


  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    setLoading(true);
    if (!input.trim() || loading) return;

    const newUserMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const newBotMessage: Message = {
        role: "agent",
        content: data.reply || "Sorry, I didn't understand that.",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, newBotMessage]);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col bg-gray-900 text-white">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-semibold">Chat with Agent</h1>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-2",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "agent" && (
                   <div className="flex items-center gap-2">
                   <Image src="/chatbot.png" alt="Chatbot" width={50} height={50} className="rounded-full" />
                 </div>
              )}
              <div
                className={cn(
                  "p-3 rounded-lg max-w-[80%]",
                  message.role === "agent"
                    ? "bg-gray-700 text-white"
                    : "bg-blue-600 text-white"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">
                    {message.role === "agent" ? "Agent" : "You"}
                  </span>
                  <span className="text-xs text-gray-300">
                    {message.timestamp}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">
                {message.content.replace(/<think\b[^>]*>[\s\S]*?<\/think>/gi, "").trim()}
                </p>
              </div>
            </div>
          ))}
         <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:border-blue-500"
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            {loading ? "Loading..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}