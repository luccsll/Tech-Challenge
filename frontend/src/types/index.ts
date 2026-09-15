export interface Post {
  id: string;
  title: string;
  author: string;
  description: string;
  content: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  username: string;
}

export interface PostFormValues {
  title: string;
  author: string;
  description: string;
  content: string;
}
