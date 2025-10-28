"use client";

import { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaTimes, FaComments } from "react-icons/fa";
import { useRoomRequestChat } from "@/hooks/use-room-request-chat";
import { getConversations } from "@/services/conversationService";
import { IMessageReceivedData } from "@/types/common/socket";
import { MessageSender } from "@/enums/messageSender";
import { toast } from "react-hot-toast";

interface RoomRequestChatProps {
  roomRequestId: number;
  currentUserId?: number; // Optional, not used but kept for future use
  isHost: boolean;
  otherUserName: string;
  roomName: string;
  onClose: () => void;
}

export default function RoomRequestChat({
  roomRequestId,
  isHost,
  otherUserName,
  roomName,
  onClose,
}: RoomRequestChatProps) {
  const [messageInput, setMessageInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const {
    isConnected,
    isJoined,
    messages,
    typingUsers,
    sendMessage,
    markAsRead,
    startTyping,
    stopTyping,
    setInitialMessages,
  } = useRoomRequestChat({
    roomRequestId,
    onMessageReceived: (message) => {
      // Auto scroll to bottom on new message
      setTimeout(() => scrollToBottom(), 100);
      // Mark as read if chat is open
      if (
        message.sender !== (isHost ? MessageSender.HOST : MessageSender.USER)
      ) {
        markAsRead();
      }
    },
  });

  // Load initial messages
  useEffect(() => {
    const loadMessages = async () => {
      try {
        setIsLoading(true);
        setIsInitialLoadComplete(false);
        const response = await getConversations({ roomRequestId });
        if (response.data && response.data.data) {
          setInitialMessages(response.data.data);
          // Mark messages as read
          setTimeout(() => markAsRead(), 500);
        }
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || "Failed to load messages";
        toast.error(errorMessage);
        console.error("Error loading messages:", error);
      } finally {
        // Add a small delay to ensure smooth transition
        setTimeout(() => {
          setIsLoading(false);
          setIsInitialLoadComplete(true);
        }, 300);
      }
    };

    loadMessages();
  }, [roomRequestId, setInitialMessages, markAsRead]);

  // Scroll to bottom when messages change (only after initial load)
  useEffect(() => {
    if (isInitialLoadComplete) {
      scrollToBottom();
    }
  }, [messages, isInitialLoadComplete]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    sendMessage(messageInput);
    setMessageInput("");
    stopTyping();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
    if (e.target.value.trim()) {
      startTyping();
    } else {
      stopTyping();
    }
  };

  const formatTime = (date: string | Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: string | Date) => {
    const msgDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (msgDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (msgDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return msgDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year:
          msgDate.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
      });
    }
  };

  const groupMessagesByDate = (messages: IMessageReceivedData[]) => {
    // Sort messages by createdAt in ascending order (oldest first)
    const sortedMessages = [...messages].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const groups: { [key: string]: IMessageReceivedData[] } = {};
    sortedMessages.forEach((msg) => {
      const date = formatDate(msg.createdAt);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(msg);
    });
    return groups;
  };

  // Group consecutive messages from the same sender
  const groupConsecutiveMessages = (msgs: IMessageReceivedData[]) => {
    const grouped: IMessageReceivedData[][] = [];
    let currentGroup: IMessageReceivedData[] = [];

    msgs.forEach((msg, index) => {
      if (index === 0) {
        currentGroup = [msg];
      } else {
        const prevMsg = msgs[index - 1];
        const timeDiff =
          new Date(msg.createdAt).getTime() -
          new Date(prevMsg.createdAt).getTime();
        // Group messages from same sender within 2 minutes
        if (msg.sender === prevMsg.sender && timeDiff < 120000) {
          currentGroup.push(msg);
        } else {
          grouped.push(currentGroup);
          currentGroup = [msg];
        }
      }
    });

    if (currentGroup.length > 0) {
      grouped.push(currentGroup);
    }

    return grouped;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white dark:bg-dropdown rounded-2xl shadow-2xl w-full max-w-4xl h-[600px] flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-purple-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaComments className="text-2xl" />
              <div>
                <h2 className="text-xl font-bold">{roomName}</h2>
                <p className="text-sm opacity-90">Chat with {otherUserName}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isConnected && isJoined ? "bg-green-400" : "bg-red-400"
                  }`}
                />
                <span className="text-sm">
                  {isConnected && isJoined ? "Connected" : "Disconnected"}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={messageContainerRef}
            className="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-900"
          >
            {isLoading || !isInitialLoadComplete ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Loading messages...
                  </p>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <FaComments className="text-6xl mb-4 opacity-50" />
                <p className="text-lg font-medium">No messages yet</p>
                <p className="text-sm">Start the conversation!</p>
              </div>
            ) : (
              <div className="space-y-6 opacity-100 transition-opacity duration-300">
                {Object.entries(messageGroups).map(([date, msgs]) => {
                  const messageGroupsByConsecutive =
                    groupConsecutiveMessages(msgs);

                  return (
                    <div key={date}>
                      {/* Date Separator */}
                      <div className="flex items-center justify-center mb-6">
                        <div className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                          {date}
                        </div>
                      </div>

                      {/* Messages for this date */}
                      <div className="space-y-4">
                        {messageGroupsByConsecutive.map(
                          (msgGroup, groupIdx) => {
                            const isSent =
                              msgGroup[0].sender ===
                              (isHost
                                ? MessageSender.HOST
                                : MessageSender.USER);

                            return (
                              <div
                                key={`group-${groupIdx}`}
                                className={`flex ${
                                  isSent ? "justify-end" : "justify-start"
                                }`}
                              >
                                <div
                                  className={`flex flex-col gap-0.5 max-w-[70%]`}
                                >
                                  {msgGroup.map((msg, msgIdx) => {
                                    const isFirst = msgIdx === 0;
                                    const isLast =
                                      msgIdx === msgGroup.length - 1;

                                    return (
                                      <div key={msg.id}>
                                        <div
                                          className={`${
                                            isSent
                                              ? "bg-primary text-white"
                                              : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                                          } px-4 py-2 shadow-sm ${
                                            isSent
                                              ? isFirst && isLast
                                                ? "rounded-[18px]"
                                                : isFirst
                                                ? "rounded-[18px] rounded-br-[4px]"
                                                : isLast
                                                ? "rounded-[18px] rounded-tr-[4px]"
                                                : "rounded-l-[18px] rounded-r-[4px]"
                                              : isFirst && isLast
                                              ? "rounded-[18px]"
                                              : isFirst
                                              ? "rounded-[18px] rounded-bl-[4px]"
                                              : isLast
                                              ? "rounded-[18px] rounded-tl-[4px]"
                                              : "rounded-r-[18px] rounded-l-[4px]"
                                          }`}
                                        >
                                          <p className="text-[15px] leading-[20px] break-words">
                                            {msg.message}
                                          </p>
                                        </div>

                                        {/* Show time and status only on last message in group */}
                                        {isLast && (
                                          <div
                                            className={`flex items-center gap-1 mt-1 px-2 text-xs ${
                                              isSent
                                                ? "justify-end text-gray-500 dark:text-gray-400"
                                                : "justify-start text-gray-500 dark:text-gray-400"
                                            }`}
                                          >
                                            <span>
                                              {formatTime(msg.createdAt)}
                                            </span>
                                            {isSent && (
                                              <span
                                                className={
                                                  msg.isRead
                                                    ? "text-blue-500"
                                                    : ""
                                                }
                                              >
                                                {msg.isRead ? "✓✓" : "✓"}
                                              </span>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Typing Indicator */}
            {typingUsers.size > 0 && (
              <div className="flex items-start gap-2 mt-2 pl-2">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-[18px] px-4 py-2.5 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"></span>
                    <span
                      className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="bg-white dark:bg-dropdown border-t border-gray-200 dark:border-gray-700 p-4 rounded-b-2xl">
            <form onSubmit={handleSendMessage} className="flex gap-2 items-end">
              <input
                type="text"
                value={messageInput}
                onChange={handleInputChange}
                onBlur={stopTyping}
                placeholder="Aa"
                disabled={!isConnected || !isJoined}
                className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed text-[15px]"
              />
              <button
                type="submit"
                disabled={!isConnected || !isJoined || !messageInput.trim()}
                className="p-2.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-10 h-10"
                title="Send"
              >
                <FaPaperPlane className="text-sm" />
              </button>
            </form>
            {!isConnected && (
              <p className="text-xs text-red-500 mt-2 text-center">
                Disconnected from server. Trying to reconnect...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
