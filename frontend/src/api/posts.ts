import { api } from "./client";
import type { Comment, Post, PostFormValues } from "../types";

export async function fetchPosts(query?: string): Promise<Post[]> {
  const { data } = await api.get<Post[]>("/posts", {
    params: query ? { q: query } : undefined,
  });
  return data;
}

export async function fetchPost(id: string): Promise<Post> {
  const { data } = await api.get<Post>(`/posts/${id}`);
  return data;
}

export async function createPost(values: PostFormValues): Promise<Post> {
  const { data } = await api.post<Post>("/posts", values);
  return data;
}

export async function updatePost(id: string, values: PostFormValues): Promise<Post> {
  const { data } = await api.put<Post>(`/posts/${id}`, values);
  return data;
}

export async function deletePost(id: string): Promise<void> {
  await api.delete(`/posts/${id}`);
}

export async function fetchComments(postId: string): Promise<Comment[]> {
  const { data } = await api.get<Comment[]>(`/posts/${postId}/comments`);
  return data;
}

export async function addComment(postId: string, author: string, text: string): Promise<Comment> {
  const { data } = await api.post<Comment>(`/posts/${postId}/comments`, { author, text });
  return data;
}
