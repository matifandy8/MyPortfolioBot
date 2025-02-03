'use client'

import { useState } from "react"
import { cn } from "@/app/lib/utils"

interface Message {
  role: "agent" | "user"
  content: string
  timestamp: string
}

export default function ChatInterface() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      content: "Hello, I am a generative AI agent. How may I assist you today?",
      timestamp: "4:08:28 PM"
    },
    {
      role: "user",
      content: "Hi, I'd like to check my bill.",
      timestamp: "4:08:37 PM"
    },
    {
      role: "agent",
      content: "Please hold for a second.\n\nOk, I can help you with that\n\nI'm pulling up your current bill information\n\nYour current bill is $150, and it is due on August 31, 2024.\n\nIf you need more details, feel free to ask!",
      timestamp: "4:08:37 PM"
    }
  ])

  const handleSend = () => {
    if (input) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "user",
          content: input,
          timestamp: new Date().toLocaleTimeString()
        }
      ])
      setInput("")
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-semibold">Chat with Agent</h1>
      </div>

      {/* Chat Messages Area */}
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
                <div className="h-8 w-8 rounded-full bg-gray-700 flex-shrink-0" />
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
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Input Area */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}