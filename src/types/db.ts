export type CategorySlug = "ai" | "stablecoin" | "web3";

export interface Post {
  id: string;
  title: string;
  body_md: string;
  category_slug: CategorySlug;
  user_id: string;
  image_urls: string[] | null;
  created_at: string;
  updated_at: string;
  author_email?: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  body_md: string;
  created_at: string;
  author_email?: string;
}
