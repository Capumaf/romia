"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useDemo } from "./DemoProvider";
import TypingIndicator from "./TypingIndicator";
import { useEffect, useRef } from "react";

export default function ChatWindow() {
  const { visibleMessages } = useDemo();

  const displayedMessages = visibleMessages.slice(-10);
  
  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
  if (chatRef.current) {
    chatRef.current.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }
}, [visibleMessages]);

  return (
    <div
      className="h-full rounded-2xl border p-5"
      style={{
        borderColor: "var(--pink-line)",
        background: "var(--bg-elev)",
      }}
    >
      <div className="mb-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em]">
          Cliente
        </p>

        <p
          className="mt-1 text-sm"
          style={{ color: "var(--ink-mute)" }}
        >
          WhatsApp
        </p>
      </div>

        <div
        ref={chatRef}
        className="h-[280px] overflow-y-auto scrollbar-hide flex flex-col gap-3 lg:h-[400px]"
        >

        <AnimatePresence>
          {displayedMessages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                message.sender === "client"
                  ? "ml-auto"
                  : ""
              }`}
              style={{
                background:
                  message.sender === "client"
                    ? "rgba(45,212,191,.14)"
                    : "rgba(255,255,255,.06)",
              }}
            >
              <>
              <div>{message.text}</div>
               {message.time && (
              <div
              className="mt-2 text-[10px] text-right"
              style={{
              color: "var(--ink-mute)",
               opacity: 0.7,
              }}
              >
              {message.time}
              </div>
              )}
               </>
            </motion.div>
          ))}
        </AnimatePresence>
        <TypingIndicator />
      </div>
    </div>
  );
}