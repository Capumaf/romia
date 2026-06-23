"use client";

export default function TypingIndicator() {
  return (
    <div
      className="w-fit rounded-2xl px-4 py-3"
      style={{
        background: "rgba(255,255,255,.06)",
      }}
    >
      <div className="flex gap-1">
        <span className="h-2 w-2 animate-pulse rounded-full bg-white/60" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-white/60" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-white/60" />
      </div>
    </div>
  );
}