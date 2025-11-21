export type ReactionType = 'THUMBS_UP' | 'HEART' | 'LAUGH' | 'THUMBS_DOWN' | 'ANGRY';

export type ReactionCounts = Record<ReactionType, number>;

export interface Message {
  id: string;
  content: string;
  created_at: Date;
  ip_hash: string | null;
  deleted: boolean;
  user_name?: string | null;
  parent_id?: string | null;
  replies?: Message[];
  reactions: ReactionCounts;
}

export interface GetMessagesQuery {
  limit?: number;
  before?: string;
}

export interface GetMessagesResponse {
  messages: Message[];
  hasMore: boolean;
  nextCursor?: string;
}

export interface PostMessageRequest {
  content: string;
  username?: string | null;
  parentId?: string | null;
}

export interface PostMessageResponse {
  message: Message;
}

export interface ReactionRequest {
  reaction: ReactionType;
}

export interface ReactionResponse {
  messageId: string;
  reactions: ReactionCounts;
}

export interface ApiError {
  error: string;
  code?: string;
}
