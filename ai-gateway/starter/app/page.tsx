"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

export default function OrderWindow() {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({ api: "/api/order" }),
  });

  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: "48px 16px 96px" }}>
      <h1 style={{ fontSize: 24 }}>Taco Tuesday</h1>
      <p style={{ color: "#666" }}>Order window is open. What can we get you?</p>

      {messages.map((message) => (
        <div key={message.id} style={{ margin: "16px 0", whiteSpace: "pre-wrap" }}>
          <strong>{message.role === "user" ? "You: " : "Truck: "}</strong>
          {message.parts.map((part, i) =>
            part.type === "text" ? <span key={`${message.id}-${i}`}>{part.text}</span> : null
          )}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <input
          value={input}
          placeholder="Two al pastor and an agua fresca, please"
          onChange={(e) => setInput(e.currentTarget.value)}
          style={{
            position: "fixed",
            bottom: 32,
            width: "min(560px, calc(100% - 32px))",
            padding: 12,
            border: "1px solid #ccc",
            borderRadius: 8,
            fontSize: 16,
          }}
        />
      </form>
    </main>
  );
}
