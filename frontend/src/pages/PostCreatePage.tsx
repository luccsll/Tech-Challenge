import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import { PostForm } from "../components/PostForm";
import { Page } from "../components/ui";
import type { PostFormValues } from "../types";

export function PostCreatePage() {
  const navigate = useNavigate();

  async function handleSubmit(values: PostFormValues) {
    const post = await createPost(values);
    navigate(`/posts/${post.id}`);
  }

  return (
    <Page>
      <h1>Nova postagem</h1>
      <PostForm submitLabel="Publicar" onSubmit={handleSubmit} onCancel={() => navigate(-1)} />
    </Page>
  );
}
