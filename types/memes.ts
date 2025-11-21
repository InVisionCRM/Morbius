export interface Meme {
  id: string;
  image_url: string;
  title?: string | null;
  creator_name?: string | null;
  created_at: string;
}

export interface CreateMemeRequest {
  imageData: string; // data URL
  title?: string;
  creatorName?: string | null;
}

export interface CreateMemeResponse {
  meme: Meme;
}
