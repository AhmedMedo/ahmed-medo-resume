import type { ChatMessage } from "@/lib/chat-context";

export function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 font-sans text-sm leading-relaxed ${
          isUser
            ? "bg-gold/90 text-espresso"
            : "border border-line bg-espresso-raised text-cream"
        }`}
      >
        {message.content || (
          <span className="inline-flex gap-1">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold" />
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold [animation-delay:0.2s]" />
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold [animation-delay:0.4s]" />
          </span>
        )}
      </div>
    </div>
  );
}
