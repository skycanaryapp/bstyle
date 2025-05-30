"use client"

import { useState, type FormEvent } from "react"
import { Bot, Paperclip, Mic, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage, TypingIndicator } from "@/components/ui/chat-bubble"
import { ChatInput } from "@/components/ui/chat-input"
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat"
import { ChatMessageList } from "@/components/ui/chat-message-list"

export default function ExpandableChatDemo() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "مرحباً بك في بي ستايل! أنا هنا لمساعدتك في أي استفسار حول خدماتنا ومنتجاتنا. كيف يمكنني مساعدتك اليوم؟",
      sender: "ai",
    },
    {
      id: 2,
      content: "أريد معرفة المزيد عن خدمات التصميم المتاحة لديكم",
      sender: "user",
    },
    {
      id: 3,
      content:
        "ممتاز! نحن نقدم مجموعة واسعة من خدمات التصميم بما في ذلك تصميم الهوية البصرية، تصميم المواقع الإلكترونية، والتصميم الجرافيكي. هل تود معرفة تفاصيل أكثر عن خدمة معينة؟",
      sender: "ai",
    },
  ])

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content: input,
        sender: "user",
      },
    ])
    setInput("")
    setIsLoading(true)

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: "شكراً لك على سؤالك! سأقوم بالرد عليك في أقرب وقت ممكن. هل هناك أي شيء آخر يمكنني مساعدتك فيه؟",
          sender: "ai",
        },
      ])
      setIsLoading(false)
    }, 2000)
  }

  const handleAttachFile = () => {
    // منطق إرفاق الملفات
  }

  const handleMicrophoneClick = () => {
    // منطق الإدخال الصوتي
  }

  return (
    <div
      className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
      dir="rtl"
    >
      <ExpandableChat size="lg" position="bottom-right" icon={<Bot className="h-6 w-6" />}>
        <ExpandableChatHeader className="flex-col text-center justify-center">
          <h1 className="text-xl font-semibold" style={{ fontFamily: "Tajawal, sans-serif" }}>
            دردش مع الذكاء الاصطناعي ✨
          </h1>
          <p className="text-sm text-muted-foreground" style={{ fontFamily: "Tajawal, sans-serif" }}>
            اسألني أي شيء عن خدماتنا
          </p>
        </ExpandableChatHeader>

        <ExpandableChatBody>
          <ChatMessageList>
            {messages.map((message) => (
              <ChatBubble key={message.id} variant={message.sender === "user" ? "sent" : "received"}>
                <ChatBubbleAvatar
                  className="h-9 w-9 shrink-0"
                  src={
                    message.sender === "user"
                      ? "/placeholder.svg?height=36&width=36"
                      : "/placeholder.svg?height=36&width=36"
                  }
                  fallback={message.sender === "user" ? "أنت" : "بوت"}
                />
                <ChatBubbleMessage variant={message.sender === "user" ? "sent" : "received"}>
                  {message.content}
                </ChatBubbleMessage>
              </ChatBubble>
            ))}

            {isLoading && (
              <ChatBubble variant="received">
                <ChatBubbleAvatar
                  className="h-9 w-9 shrink-0"
                  src="/placeholder.svg?height=36&width=36"
                  fallback="بوت"
                />
                <div className="max-w-[70%] bg-gray-50 rounded-2xl rounded-br-sm shadow-[0px_2px_6px_rgba(0,0,0,0.1)]">
                  <TypingIndicator />
                </div>
              </ChatBubble>
            )}
          </ChatMessageList>
        </ExpandableChatBody>

        <ExpandableChatFooter>
          <form
            onSubmit={handleSubmit}
            className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
          >
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-3 pt-0 justify-between">
              <Button
                type="submit"
                size="sm"
                className="gap-1.5 bg-black hover:bg-gray-800 text-white"
                style={{ fontFamily: "Tajawal, sans-serif" }}
                disabled={!input.trim()}
              >
                إرسال الرسالة
                <Send className="size-3.5 scale-x-[-1]" />
              </Button>
              <div className="flex">
                <Button variant="ghost" size="icon" type="button" onClick={handleMicrophoneClick}>
                  <Mic className="size-4" />
                </Button>

                <Button variant="ghost" size="icon" type="button" onClick={handleAttachFile}>
                  <Paperclip className="size-4" />
                </Button>
              </div>
            </div>
          </form>
        </ExpandableChatFooter>
      </ExpandableChat>
    </div>
  )
}
