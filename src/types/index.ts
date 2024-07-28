export interface User {
    id: number;
    name: string;
    email: string;
    following: number[];
  }
  
  export interface Discussion {
    id: number;
    text: string;
    image?: string;
    hashtags: string[];
    createdOn: string;
    author: User;
    likes: number;
    comments: Comment[];
  }
  
  export interface Comment {
    id: number;
    text: string;
    author: User;
    likes: number;
    replies: Comment[];
  }
  