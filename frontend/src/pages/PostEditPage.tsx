import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost, updatePost } from "../api/posts";
import { PostForm } from "../components/PostForm";
import { Page } from "../components/ui";
import type { Post, PostFormValues } from "../types";

export function PostEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) fetchPost(id).then(setPost);
  }, [id]);

  async function handleSubmit(values: PostFormValues) {
    if (!id) return;
    await updatePost(id, values);
    navigate(`/posts/${id}`);
  }

  if (!post) {
    return (
      <Page>
        <p>Carregando post...</p>
      </Page>
    );
  }

  return (
    <Page>
      <h1>Editar postagem</h1>
      <PostForm
        initialValues={{
          title: post.title,
          author: post.author,
          description: post.description,
          content: post.content,
        }}
        submitLabel="Salvar alterações"
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </Page>
  );
}
