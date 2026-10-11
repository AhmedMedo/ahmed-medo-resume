"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

type ChatStatus = "idle" | "thinking" | "error";

interface ChatContextValue {
  isOpen: boolean;
  status: ChatStatus;
  messages: ChatMessage[];
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  sendMessage: (text: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextValue | null>(null);

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${idCounter}`;
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: nextId(),
      role: "assistant",
      content:
        "Welcome — I'm Medo, Ahmed's AI concierge. Ask me anything about his nine-plus years of experience, his skills, or his work, by voice or text.",
    },
  ]);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen((v) => !v), []);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = { id: nextId(), role: "user", content: trimmed };
    const assistantId = nextId();
    const history = [...messagesRef.current, userMessage];

    setMessages([...history, { id: assistantId, role: "assistant", content: "" }]);
    setStatus("thinking");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        const errorText =
          data?.error ?? "Medo hit a snag and couldn't respond. Please try again.";
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: errorText } : m))
        );
        setStatus("error");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const snapshot = acc;
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: snapshot } : m))
        );
      }

      setStatus("idle");
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "Medo lost connection. Please try again in a moment." }
            : m
        )
      );
      setStatus("error");
    }
  }, []);

  const value = useMemo(
    () => ({ isOpen, status, messages, openChat, closeChat, toggleChat, sendMessage }),
    [isOpen, status, messages, openChat, closeChat, toggleChat, sendMessage]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat(): ChatContextValue {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within a ChatProvider");
  return ctx;
}
