"use client"

import type React from "react"
import { useRef, useState } from "react"
import { X, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type ChatPosition = "bottom-right" | "bottom-left"
export type ChatSize = "sm" | "md" | "lg" | "xl" | "full"

const chatConfig = {
  dimensions: {
    sm: "sm:max-w-sm sm:max-h-[500px]",
    md: "sm:max-w-md sm:max-h-[600px]",
    lg: "sm:max-w-lg sm:max-h-[700px]",
    xl: "sm:max-w-xl sm:max-h-[800px]",
    full: "sm:w-full sm:h-full",
  },
  positions: {
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
  },
  chatPositions: {
    "bottom-right": "sm:bottom-[calc(100%+10px)] sm:right-0",
    "bottom-left": "sm:bottom-[calc(100%+10px)] sm:left-0",
  },
  states: {
    open: "pointer-events-auto opacity-100 visible scale-100 translate-y-0",
    closed: "pointer-events-none opacity-0 invisible scale-100 sm:translate-y-5",
  },
}

interface ExpandableChatProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: ChatPosition
  size?: ChatSize
  icon?: React.ReactNode
}

const ExpandableChat: React.FC<ExpandableChatProps> = ({
  className,
  position = "bottom-right",
  size = "md",
  icon,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => setIsOpen(!isOpen)

  return (
    <div className={cn(`fixed ${chatConfig.positions[position]} z-50`, className)} {...props}>
      <div
        ref={chatRef}
        dir="rtl"
        className={cn(
          "flex flex-col bg-background border sm:rounded-lg shadow-md overflow-hidden transition-all duration-250 ease-out sm:absolute sm:w-[90vw] sm:h-[80vh] fixed inset-0 w-full h-full sm:inset-auto",
          chatConfig.chatPositions[position],
          chatConfig.dimensions[size],
          isOpen ? chatConfig.states.open : chatConfig.states.closed,
          className,
        )}
      >
        {children}
        <Button variant="ghost" size="icon" className="absolute top-2 left-2 sm:hidden" onClick={toggleChat}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ExpandableChatToggle icon={icon} isOpen={isOpen} toggleChat={toggleChat} />
    </div>
  )
}

ExpandableChat.displayName = "ExpandableChat"

const ExpandableChatHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div
    dir="rtl"
    className={cn(
      "relative flex items-center justify-center h-[80px] border-b overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black rounded-t-lg",
      className,
    )}
    style={{
      fontFamily: "Tajawal, sans-serif",
      animation: "gradient 3s ease-in-out infinite",
    }}
    {...props}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black bg-[length:600%_600%] animate-[gradientMove_15s_ease_infinite]"></div>
    <div className="relative z-10 flex items-center justify-between w-full px-4 py-3">
      <div className="flex items-center gap-3">
        <a
          href="https://web.facebook.com/profile.php?id=61566737491653"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1877F2] hover:scale-110 transition-transform"
          aria-label="فيسبوك"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-facebook"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </a>
        <a
          href="https://www.instagram.com/bstylejo/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E4405F] hover:scale-110 transition-transform"
          aria-label="انستغرام"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-instagram"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
          </svg>
        </a>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col text-right">
          <h1
            className="text-xl font-bold text-white tracking-wide drop-shadow-lg"
            style={{ fontFamily: "Tajawal, sans-serif" }}
          >
            بي ستايل بوت
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5 justify-end">
            <span className="text-sm text-white/90" style={{ fontFamily: "Tajawal, sans-serif" }}>
              نشطون دائماً
            </span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#00C76F] shadow-[0_0_8px_rgba(0,199,111,0.6)] animate-pulse"></span>
          </div>
        </div>
        <img
          src="https://scontent.famm12-1.fna.fbcdn.net/v/t39.30808-6/462102478_122100088604557916_2116989390886148740_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE1V44lxH_8nWTTivhREEHdJuho_SSra0Qm6Gj9JKtrRF3BCplSNmm-oFR0RlqbsD59cSP3yAW_JO0MP7uJddYT&_nc_ohc=rqhi4E_K0m4Q7kNvwGQTDJw&_nc_oc=AdloUjuNJQ9QsfLBIzhM_yWV3tPCAHFZdV5LnnX8JPnGK0aYtXmgTVZPsa18eiATFbg&_nc_zt=23&_nc_ht=scontent.famm12-1.fna&_nc_gid=2CWh4u63tnaSsgIucWYaOA&oh=00_AfJCkMNSTElRZiTODaK4s95WaiMaK9HN9DCIDZ5F7np4-A&oe=683FAC29"
          alt="شعار بي ستايل"
          className="h-10 w-10 rounded-full object-cover border border-white/20 shadow-lg"
        />
      </div>
    </div>
    <style jsx>{`
      @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap');
      @keyframes gradient {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `}</style>
  </div>
)

ExpandableChatHeader.displayName = "ExpandableChatHeader"

const ExpandableChatBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("flex-grow overflow-y-auto", className)} dir="rtl" {...props} />
)

ExpandableChatBody.displayName = "ExpandableChatBody"

const ExpandableChatFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn("border-t p-4", className)} dir="rtl" {...props} />
)

ExpandableChatFooter.displayName = "ExpandableChatFooter"

interface ExpandableChatToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  isOpen: boolean
  toggleChat: () => void
}

const ExpandableChatToggle: React.FC<ExpandableChatToggleProps> = ({
  className,
  icon,
  isOpen,
  toggleChat,
  ...props
}) => (
  <Button
    variant="default"
    onClick={toggleChat}
    className={cn(
      "w-14 h-14 rounded-full shadow-md flex items-center justify-center hover:shadow-lg hover:shadow-black/30 transition-all duration-300",
      className,
    )}
    {...props}
  >
    {isOpen ? <X className="h-6 w-6" /> : icon || <MessageCircle className="h-6 w-6" />}
  </Button>
)

ExpandableChatToggle.displayName = "ExpandableChatToggle"

export { ExpandableChat, ExpandableChatHeader, ExpandableChatBody, ExpandableChatFooter }
