"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { REACTION_CONFIG } from "@/lib/reactions";
import type {
  Message,
  GetMessagesResponse,
  ApiError,
  ReactionType,
  ReactionResponse,
  ReactionCounts,
} from "@/types/messages";

const MAX_CONTENT_LENGTH = 500;
const MAX_USERNAME_LENGTH = 25;
const DEFAULT_LIMIT = 20;
const REACTED_MESSAGES_KEY = "reacted_messages";

// Helper functions for sessionStorage
function getReactedMessages(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = sessionStorage.getItem(REACTED_MESSAGES_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function markMessageAsReacted(messageId: string): void {
  if (typeof window === "undefined") return;
  try {
    const reacted = getReactedMessages();
    reacted.add(messageId);
    sessionStorage.setItem(REACTED_MESSAGES_KEY, JSON.stringify([...reacted]));
  } catch {
    // Ignore storage errors
  }
}

function hasReactedToMessage(messageId: string): boolean {
  return getReactedMessages().has(messageId);
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function formatTimestamp(date: Date | string): string {
  const now = new Date();
  const messageDate = new Date(date);
  const diffMs = now.getTime() - messageDate.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return messageDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: messageDate.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

function normalizeMessages(items: Message[]): Message[] {
  return items.map((message) => ({
    ...message,
    created_at: new Date(message.created_at),
    replies: message.replies ? normalizeMessages(message.replies) : [],
  }));
}

function updateMessageReactions(
  items: Message[],
  messageId: string,
  reactions: ReactionCounts
): Message[] {
  return items.map((message) => {
    if (message.id === messageId) {
      return { ...message, reactions };
    }

    if (message.replies && message.replies.length > 0) {
      return {
        ...message,
        replies: updateMessageReactions(message.replies, messageId, reactions),
      };
    }

    return message;
  });
}

export default function CommunityPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchMessages = async (cursor?: string, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const params = new URLSearchParams({
        limit: String(DEFAULT_LIMIT),
        ...(cursor && { before: cursor }),
      });

      const response = await fetch(`/api/messages?${params}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const data: GetMessagesResponse = await response.json();
      const normalized = normalizeMessages(data.messages);

      if (append) {
        setMessages((prev) => [...prev, ...normalized]);
      } else {
        setMessages(normalized);
      }
      
      setHasMore(data.hasMore);
      setNextCursor(data.nextCursor);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages. Please refresh the page.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const trimmedContent = content.trim();
    if (!trimmedContent || trimmedContent.length > MAX_CONTENT_LENGTH) {
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: trimmedContent,
          username: username.trim().length > 0 ? username.trim() : null,
          parentId: replyTo?.id ?? null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as ApiError;
        setError(errorData.error || "Failed to post message");
        return;
      }

      // Success - clear form and refetch messages
      setContent("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setReplyTo(null);
      
      // Refetch messages to show the new one
      await fetchMessages();
    } catch (err) {
      console.error("Error posting message:", err);
      setError("Failed to post message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoadMore = () => {
    if (nextCursor && !loadingMore) {
      fetchMessages(nextCursor, true);
    }
  };

  const remainingChars = MAX_CONTENT_LENGTH - content.length;
  const isContentValid = content.trim().length > 0 && content.length <= MAX_CONTENT_LENGTH;
  const isUsernameValid = username.trim().length <= MAX_USERNAME_LENGTH;

  const handleReaction = async (messageId: string, reaction: ReactionType) => {
    // Check if user has already reacted to this message
    if (hasReactedToMessage(messageId)) {
      setError("You've already reacted to this message.");
      return;
    }

    try {
      const response = await fetch(`/api/messages/${messageId}/reactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reaction }),
      });

      if (!response.ok) {
        throw new Error("Failed to update reaction");
      }

      const data: ReactionResponse = await response.json();
      setMessages((prev) => updateMessageReactions(prev, data.messageId, data.reactions));
      
      // Mark message as reacted to prevent spam
      markMessageAsReacted(messageId);
    } catch (err) {
      console.error("Error updating reaction:", err);
      setError("Failed to update reaction. Please try again.");
    }
  };

  const startReply = (message: Message) => {
    setReplyTo(message);
    document.getElementById("community-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const ReactionDropdown = ({ message }: { message: Message }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const hasReacted = hasReactedToMessage(message.id);

    // Get reactions that have counts > 0
    const activeReactions = REACTION_CONFIG.filter(
      (reaction) => (message.reactions?.[reaction.type] ?? 0) > 0
    );

    // Close dropdown when clicking outside
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen]);

    return (
      <div className="flex flex-wrap items-center gap-2">
        {/* Display active reactions */}
        {activeReactions.map((reaction) => (
          <button
            key={reaction.type}
            type="button"
            onClick={() => handleReaction(message.id, reaction.type)}
            disabled={hasReacted}
            className="flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 text-xs rounded-full hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Add ${reaction.label} reaction`}
            title={hasReacted ? "You've already reacted to this message" : `Add ${reaction.label} reaction`}
          >
            <span aria-hidden="true">{reaction.emoji}</span>
            <span className="text-gray-200">{message.reactions?.[reaction.type] ?? 0}</span>
          </button>
        ))}

        {/* Dropdown button */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            disabled={hasReacted}
            className="flex items-center gap-1 px-2 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Add reaction"
            title={hasReacted ? "You've already reacted to this message" : "Add reaction"}
          >
            <span>👍</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          <div
            className={`absolute top-0 left-full ml-2 bg-black/30 border border-white/20 rounded-lg shadow-lg z-10 w-auto backdrop-blur-sm transition-all duration-200 ease-out ${
              isOpen
                ? "opacity-100 translate-x-0 pointer-events-auto"
                : "opacity-0 -translate-x-2 pointer-events-none"
            }`}
          >
            <div className="p-2">
              <div className="flex flex-col gap-1">
                {REACTION_CONFIG.map((reaction) => (
                  <button
                    key={reaction.type}
                    type="button"
                    onClick={() => {
                      handleReaction(message.id, reaction.type);
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 px-2 py-2 hover:bg-white/10 rounded text-sm transition-colors"
                    aria-label={reaction.label}
                  >
                    <span>{reaction.emoji}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMessage = (message: Message, isReply = false) => {
    const displayName = message.user_name && message.user_name.length > 0 ? message.user_name : "Anonymous";

    return (
      <div
        key={message.id}
        className={`bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-white/20 transition-colors ${
          isReply ? "ml-4" : ""
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <p className="text-sm font-semibold text-white">{displayName}</p>
            <p className="text-xs text-gray-500">{formatTimestamp(message.created_at)}</p>
          </div>
          <button
            type="button"
            onClick={() => startReply(message)}
            className="text-xs text-purple-300 hover:text-purple-200 underline-offset-2 hover:underline"
          >
            Reply
          </button>
        </div>
        <p className="text-white font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
          {escapeHtml(message.content)}
        </p>

        <div className="mt-4">
          <ReactionDropdown message={message} />
        </div>

        {message.replies && message.replies.length > 0 && (
          <div className="mt-4 space-y-4 border-l border-white/10 pl-4">
            {message.replies.map((reply) => renderMessage(reply, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Morbius Anonymous
          </h1>
          <p className="text-gray-400 text-lg">
            Share you conspiracy theories on what is going on with ProveX, RH, PulseChain or whatever you want...
          </p>
        </div>

        {/* Post Form */}
        <div
          id="community-form"
          className="mb-8 bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Display name (optional)
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.slice(0, MAX_USERNAME_LENGTH))}
                maxLength={MAX_USERNAME_LENGTH}
                placeholder="Leave blank to stay anonymous"
                className="w-full bg-black/60 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 text-sm"
              />
            </div>

            {replyTo && (
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300">
                <span>
                  Replying to <span className="font-semibold text-white">{replyTo.user_name ?? "Anonymous"}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setReplyTo(null)}
                  className="text-xs text-purple-300 hover:text-purple-100 underline-offset-2 hover:underline"
                >
                  Cancel
                </button>
              </div>
            )}

            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your message here..."
                maxLength={MAX_CONTENT_LENGTH}
                rows={4}
                className="w-full bg-black/60 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors resize-none font-mono text-sm"
              />
              <div className="flex items-center justify-between mt-2">
                <span
                  className={`text-xs ${
                    remainingChars < 20
                      ? "text-red-400"
                      : remainingChars < 50
                      ? "text-yellow-400"
                      : "text-gray-500"
                  }`}
                >
                  {remainingChars} characters remaining
                </span>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-200 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-3 text-green-200 text-sm">
                Message posted successfully!
              </div>
            )}

            <button
              type="submit"
              disabled={!isContentValid || submitting || !isUsernameValid}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg font-medium text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {submitting ? "Posting..." : replyTo ? "Post Reply" : "Post Message"}
            </button>
          </form>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {loading && messages.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              Loading messages...
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              No messages yet. Be the first to post!
            </div>
          ) : (
            <>
              {messages.map((message) => renderMessage(message))}

              {hasMore && (
                <div className="text-center pt-4">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-6 py-3 bg-white/5 border border-white/20 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium text-white transition-colors"
                  >
                    {loadingMore ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
