"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@/lib/chat-context";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { profile } from "@/lib/data/resume";
import { ChatBubble } from "./ChatBubble";

function MicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" strokeLinecap="round" />
      <path d="M12 19v3" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3 12l18-8-8 18-2.5-7.5L3 12z" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function ChatGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path
        d="M21 12a8 8 0 0 1-8 8H5.5L3 22V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.5 11.5h7M8.5 15h4.5" strokeLinecap="round" />
    </svg>
  );
}

export function ChatWidget() {
  const { isOpen, status, messages, toggleChat, closeChat, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const { isSupported: micSupported, isListening, start, stop } = useSpeechRecognition(
    (transcript) => setInput((prev) => (prev ? `${prev} ${transcript}` : transcript))
  );

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === "thinking") return;
    const text = input;
    setInput("");
    void sendMessage(text);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeChat}
              className="fixed inset-0 z-40 bg-black/50"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-accent/60 bg-canvas"
            >
              <div className="flex items-center justify-between border-b border-line bg-surface px-5 py-4">
                <div>
                  <p className="font-display text-xl text-fg">{profile.assistantName}</p>
                  <p className="font-mono text-xs tracking-wide text-fg-muted">
                    {status === "thinking" ? "thinking…" : "AI concierge · ready"}
                  </p>
                </div>
                <button
                  onClick={closeChat}
                  aria-label="Close chat"
                  className="rounded-full border border-line p-2 text-fg-muted transition hover:border-accent hover:text-accent"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>

              <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
                {messages.map((message) => (
                  <ChatBubble key={message.id} message={message} />
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t border-line p-4">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  placeholder={`Ask ${profile.assistantName} anything…`}
                  rows={1}
                  className="max-h-24 flex-1 resize-none rounded-xl border border-line bg-surface px-3 py-2.5 font-sans text-sm text-fg outline-none placeholder:text-fg-muted/60 focus:border-accent"
                />
                <button
                  type="button"
                  onClick={isListening ? stop : start}
                  disabled={!micSupported}
                  title={micSupported ? "Voice input" : "Voice input not supported in this browser"}
                  aria-label="Voice input"
                  className={`shrink-0 rounded-full border p-2.5 transition ${
                    isListening
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-line text-fg-muted hover:border-accent hover:text-accent"
                  } disabled:cursor-not-allowed disabled:opacity-30`}
                >
                  <MicIcon className="h-4 w-4" />
                </button>
                <button
                  type="submit"
                  disabled={!input.trim() || status === "thinking"}
                  aria-label="Send message"
                  className="shrink-0 rounded-full bg-accent p-2.5 text-canvas transition hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <SendIcon className="h-4 w-4" />
                </button>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <button
        onClick={toggleChat}
        aria-label={`Ask ${profile.assistantName}`}
        title={`Ask ${profile.assistantName}`}
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-accent bg-surface text-accent shadow-lg shadow-black/40 transition hover:bg-accent hover:text-canvas"
      >
        <ChatGlyph className="h-6 w-6" />
        <span
          className={`absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-canvas bg-accent ${
            status === "thinking" ? "animate-pulse-dot" : ""
          }`}
        />
      </button>
    </>
  );
}
