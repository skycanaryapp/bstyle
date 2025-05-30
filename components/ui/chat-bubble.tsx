"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageLoading } from "@/components/ui/message-loading"

interface ChatBubbleProps {
  variant?: "sent" | "received"
  layout?: "default" | "ai"
  className?: string
  children: React.ReactNode
}

export function ChatBubble({ variant = "received", layout = "default", className, children }: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "flex items-end gap-3 mb-6 animate-[slideIn_300ms_ease-in-out]",
        // In RTL: user messages (sent) appear on LEFT, bot messages (received) appear on RIGHT
        variant === "sent" && "flex-row-reverse justify-start",
        variant === "received" && "justify-end",
        className,
      )}
      dir="rtl"
    >
      {children}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px) ${variant === "sent" ? "translateX(-10px)" : "translateX(10px)"};
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
    </div>
  )
}

interface ChatBubbleMessageProps {
  variant?: "sent" | "received"
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
}

export function ChatBubbleMessage({ variant = "received", isLoading, className, children }: ChatBubbleMessageProps) {
  return (
    <div
      className={cn(
        "relative max-w-[70%] px-5 py-4 text-right leading-relaxed transition-all duration-200 hover:shadow-lg",
        variant === "sent"
          ? "bg-black text-white rounded-2xl rounded-bl-sm shadow-[0px_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.3)]" // User messages: dark background, white text
          : "bg-gray-50 text-gray-800 rounded-2xl rounded-br-sm shadow-[0px_2px_6px_rgba(0,0,0,0.1)] hover:shadow-[0px_4px_10px_rgba(0,0,0,0.15)]", // Bot messages: light background, dark text
        className,
      )}
      style={{
        fontFamily: "Tajawal, sans-serif",
        fontSize: "16px",
        lineHeight: "1.6",
        fontWeight: variant === "sent" ? "500" : "400",
      }}
    >
      {/* Speech tail for user messages (left side in RTL) */}
      {variant === "sent" && (
        <div
          className="absolute bottom-0 left-[-6px] w-0 h-0"
          style={{
            borderTop: "8px solid black",
            borderRight: "8px solid transparent",
            borderLeft: "0px solid transparent",
          }}
        />
      )}

      {/* Speech tail for bot messages (right side in RTL) */}
      {variant === "received" && (
        <div
          className="absolute bottom-0 right-[-6px] w-0 h-0"
          style={{
            borderTop: "8px solid #f9fafb",
            borderLeft: "8px solid transparent",
            borderRight: "0px solid transparent",
          }}
        />
      )}

      {isLoading ? (
        <div className="flex items-center justify-end space-x-2 space-x-reverse">
          <MessageLoading />
        </div>
      ) : (
        <div className="break-words">{children}</div>
      )}
    </div>
  )
}

interface ChatBubbleAvatarProps {
  src?: string
  fallback?: string
  className?: string
}

export function ChatBubbleAvatar({ src, fallback = "بوت", className }: ChatBubbleAvatarProps) {
  return (
    <Avatar className={cn("h-9 w-9 shrink-0 shadow-sm", className)}>
      {src && <AvatarImage src={src || "/placeholder.svg"} />}
      <AvatarFallback
        style={{ fontFamily: "Tajawal, sans-serif", fontSize: "12px", fontWeight: "600" }}
        className="bg-gradient-to-br from-blue-500 to-purple-600 text-white"
      >
        {fallback}
      </AvatarFallback>
    </Avatar>
  )
}

interface ChatBubbleActionProps {
  icon?: React.ReactNode
  onClick?: () => void
  className?: string
}

export function ChatBubbleAction({ icon, onClick, className }: ChatBubbleActionProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-6 w-6 hover:bg-gray-100 transition-colors", className)}
      onClick={onClick}
    >
      {icon}
    </Button>
  )
}

export function ChatBubbleActionWrapper({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 mt-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity",
        className,
      )}
    >
      {children}
    </div>
  )
}

// Enhanced typing indicator component
export function TypingIndicator() {
  return (
    <div className="flex items-center justify-end space-x-1 space-x-reverse p-4">
      <div className="flex space-x-1 space-x-reverse">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
      </div>
      <span className="text-sm text-gray-500 mr-2" style={{ fontFamily: "Tajawal, sans-serif" }}>
        يكتب...
      </span>
    </div>
  )
}
