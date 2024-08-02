export interface User {
    id: number;
    name: string;
    email: string;
    following: number[];
  }
  
export interface Discussion {
  id: number;
  content: string;
  created_on: string;
  image: string;
  user_id: number;
  hashtags?: string[];
}
  
export interface Comment {
  id: number;
  text: string;
  author: User;
  likes: number;
  replies: Comment[];
}

export interface DiscussionResponse {
  id: number;
  content: string;
  created_on: string;
  image: string;
  user_id: number;
  hashtags: string;
}