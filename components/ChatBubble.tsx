import type { ChatMessage } from "@/lib/chat-context";

export function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 font-sans text-[15px] leading-[1.7] ${
          isUser
            ? "bg-accent/90 text-canvas"
            : "border border-line bg-surface text-fg"
        }`}
      >
        {message.content || (
          <span className="inline-flex gap-1">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent [animation-delay:0.2s]" />
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent [animation-delay:0.4s]" />
          </span>
        )}
      </div>
    </div>
  );
}
