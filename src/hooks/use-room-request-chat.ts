"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import {
  SocketEvents,
  IMessageReceivedData,
  IUserTypingData,
  IRoomRequestErrorData,
  IMessagesMarkedReadData,
} from "@/types/common/socket";
import { getItemSecurely } from "@/utils/storageUtil";
import { toast } from "react-hot-toast";

interface UseRoomRequestChatOptions {
  roomRequestId: number;
  onMessageReceived?: (message: IMessageReceivedData) => void;
  onError?: (error: IRoomRequestErrorData) => void;
  onTyping?: (data: IUserTypingData) => void;
  onStopTyping?: (data: IUserTypingData) => void;
  onMessagesMarkedRead?: (data: IMessagesMarkedReadData) => void;
}

export const useRoomRequestChat = ({
  roomRequestId,
  onMessageReceived,
  onError,
  onTyping,
  onStopTyping,
  onMessagesMarkedRead,
}: UseRoomRequestChatOptions) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [messages, setMessages] = useState<IMessageReceivedData[]>([]);
  const [typingUsers, setTypingUsers] = useState<Set<number>>(new Set());
  const socketRef = useRef<Socket | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasShownConnectionError = useRef(false);

  // Initialize socket connection
  const connect = useCallback(() => {
    if (socketRef.current?.connected) {
      console.log("Already connected, skipping...");
      return;
    }

    const token = getItemSecurely<string>("accessToken");
    if (!token) {
      console.error("❌ No access token found in storage");
      toast.error("Authentication required. Please log in again.");
      return;
    }

    const socketUrl =
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8081";

    console.log("🔌 Connecting to Socket.IO server:", socketUrl);
    console.log("🔑 Token length:", token.length);
    console.log(
      "📦 Environment variable NEXT_PUBLIC_SOCKET_URL:",
      process.env.NEXT_PUBLIC_SOCKET_URL || "Not set (using fallback)"
    );

    socketRef.current = io(socketUrl, {
      auth: { token },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 10000,
      autoConnect: true,
    });

    // Connection events
    socketRef.current.on("connect", () => {
      console.log("✅ Socket connected successfully!");
      console.log("   Socket ID:", socketRef.current?.id);
      setIsConnected(true);
      hasShownConnectionError.current = false; // Reset error flag on successful connection
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
      setIsConnected(false);
      setIsJoined(false);

      // Attempt to reconnect for certain disconnect reasons
      if (reason === "io server disconnect") {
        // Server initiated disconnect, try to reconnect
        console.log("Server disconnected, attempting to reconnect...");
        socketRef.current?.connect();
      }
    });

    socketRef.current.on("reconnect", (attemptNumber) => {
      console.log("🔄 Reconnected after", attemptNumber, "attempts");
      toast.success("Reconnected to chat server");
    });

    socketRef.current.on("reconnect_attempt", (attemptNumber) => {
      console.log("🔄 Reconnection attempt", attemptNumber);
    });

    socketRef.current.on("reconnect_failed", () => {
      console.error("❌ Reconnection failed after all attempts");
      toast.error("Failed to reconnect. Please refresh the page.");
    });

    socketRef.current.on("connect_error", (error: any) => {
      console.error("🔴 Socket connection error:", error);
      console.error("   Error message:", error.message);
      console.error("   Error type:", error.type);

      // Only show error toast once to avoid spam
      if (!hasShownConnectionError.current) {
        toast.error(
          "Failed to connect to chat server. Please check your connection."
        );
        hasShownConnectionError.current = true;
      }
    });

    socketRef.current.on(SocketEvents.ERROR, (error: any) => {
      console.error("Socket error:", error);
      toast.error("Connection error occurred");
    });

    // Message events
    socketRef.current.on(
      SocketEvents.MESSAGE_RECEIVED,
      (data: IMessageReceivedData) => {
        setMessages((prev) => [...prev, data]);
        onMessageReceived?.(data);
      }
    );

    socketRef.current.on(SocketEvents.USER_TYPING, (data: IUserTypingData) => {
      setTypingUsers((prev) => new Set(prev).add(data.userId));
      onTyping?.(data);
    });

    socketRef.current.on(
      SocketEvents.USER_STOP_TYPING,
      (data: IUserTypingData) => {
        setTypingUsers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(data.userId);
          return newSet;
        });
        onStopTyping?.(data);
      }
    );

    socketRef.current.on(
      SocketEvents.MESSAGES_MARKED_READ,
      (data: IMessagesMarkedReadData) => {
        setMessages((prev) =>
          prev.map((msg) =>
            data.messageIds.includes(msg.id) ? { ...msg, isRead: true } : msg
          )
        );
        onMessagesMarkedRead?.(data);
      }
    );

    socketRef.current.on(
      SocketEvents.ROOM_REQUEST_ERROR,
      (error: IRoomRequestErrorData) => {
        toast.error(error.message);
        onError?.(error);
      }
    );
  }, [
    onMessageReceived,
    onError,
    onTyping,
    onStopTyping,
    onMessagesMarkedRead,
  ]);

  // Join room request
  const joinRoom = useCallback(() => {
    if (!socketRef.current?.connected) {
      console.log("⚠️ Cannot join room - socket not connected");
      return;
    }

    console.log("📥 Joining room request:", roomRequestId);
    socketRef.current.emit(SocketEvents.JOIN_ROOM_REQUEST, { roomRequestId });
    setIsJoined(true);
  }, [roomRequestId]);

  // Leave room request
  const leaveRoom = useCallback(() => {
    if (!socketRef.current?.connected) return;

    socketRef.current.emit(SocketEvents.LEAVE_ROOM_REQUEST, { roomRequestId });
    setIsJoined(false);
  }, [roomRequestId]);

  // Send message
  const sendMessage = useCallback(
    (message: string) => {
      if (!socketRef.current?.connected || !isJoined) {
        console.log("⚠️ Cannot send message - not connected or not joined");
        if (!socketRef.current?.connected) {
          toast.error("Not connected to server");
        } else {
          toast.error("Not joined to conversation");
        }
        return;
      }

      if (!message.trim()) {
        toast.error("Message cannot be empty");
        return;
      }

      console.log("📤 Sending message:", message.substring(0, 50) + "...");
      socketRef.current.emit(SocketEvents.SEND_MESSAGE, {
        roomRequestId,
        message: message.trim(),
      });
    },
    [roomRequestId, isJoined]
  );

  // Mark messages as read
  const markAsRead = useCallback(() => {
    if (!socketRef.current?.connected || !isJoined) return;

    socketRef.current.emit(SocketEvents.MARK_AS_READ, { roomRequestId });
  }, [roomRequestId, isJoined]);

  // Stop typing indicator
  const stopTyping = useCallback(() => {
    if (!socketRef.current?.connected || !isJoined) return;

    socketRef.current.emit(SocketEvents.STOP_TYPING, { roomRequestId });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  }, [roomRequestId, isJoined]);

  // Start typing indicator
  const startTyping = useCallback(() => {
    if (!socketRef.current?.connected || !isJoined) return;

    socketRef.current.emit(SocketEvents.TYPING, { roomRequestId });

    // Auto stop typing after 3 seconds
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      stopTyping();
    }, 3000);
  }, [roomRequestId, isJoined, stopTyping]);

  // Disconnect socket
  const disconnect = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    socketRef.current?.disconnect();
    socketRef.current = null;
    setIsConnected(false);
    setIsJoined(false);
  }, []);

  // Set messages from external source (e.g., initial load)
  const setInitialMessages = useCallback((msgs: IMessageReceivedData[]) => {
    setMessages(msgs);
  }, []);

  // Auto-connect and join on mount
  useEffect(() => {
    connect();
    return () => {
      if (socketRef.current?.connected) {
        leaveRoom();
      }
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isConnected && !isJoined && roomRequestId) {
      // Small delay to ensure socket is fully ready
      const timer = setTimeout(() => {
        joinRoom();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isConnected, isJoined, joinRoom, roomRequestId]);

  return {
    isConnected,
    isJoined,
    messages,
    typingUsers,
    sendMessage,
    markAsRead,
    startTyping,
    stopTyping,
    joinRoom,
    leaveRoom,
    connect,
    disconnect,
    setInitialMessages,
  };
};
