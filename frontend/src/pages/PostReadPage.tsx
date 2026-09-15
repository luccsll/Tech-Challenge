import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { addComment, fetchComments, fetchPost } from "../api/posts";
import { Button, ButtonRow, Field, Input, Page } from "../components/ui";
import type { Comment, Post } from "../types";

const Title = styled.h1`
  margin-bottom: 4px;
`;

const Meta = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 0;
`;

const Content = styled.article`
  line-height: 1.7;
  white-space: pre-wrap;
  margin-top: 24px;
`;

const CommentsSection = styled.section`
  margin-top: 48px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 24px;
`;

const CommentItem = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 12px 16px;
  margin-bottom: 12px;
`;

const CommentAuthor = styled.strong`
  display: block;
  margin-bottom: 4px;
`;

export function PostReadPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (!id) return;
    fetchPost(id)
      .then(setPost)
      .catch(() => setNotFound(true));
    fetchComments(id).then(setComments);
  }, [id]);

  async function handleSubmitComment(event: React.FormEvent) {
    event.preventDefault();
    if (!id || !author.trim() || !text.trim()) return;

    const comment = await addComment(id, author.trim(), text.trim());
    setComments((prev) => [...prev, comment]);
    setAuthor("");
    setText("");
  }

  if (notFound) {
    return (
      <Page>
        <p>Post não encontrado.</p>
        <Link to="/">Voltar para a lista</Link>
      </Page>
    );
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
      <Button $variant="ghost" onClick={() => navigate(-1)}>
        ← Voltar
      </Button>
      <Title>{post.title}</Title>
      <Meta>
        Por {post.author} · {new Date(post.createdAt).toLocaleDateString("pt-BR")}
      </Meta>
      <Content>{post.content}</Content>

      <CommentsSection>
        <h2>Comentários</h2>
        {comments.length === 0 && <p>Nenhum comentário ainda. Seja o primeiro a comentar.</p>}
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentAuthor>{comment.author}</CommentAuthor>
            <span>{comment.text}</span>
          </CommentItem>
        ))}

        <form onSubmit={handleSubmitComment}>
          <Field>
            <label htmlFor="comment-author">Seu nome</label>
            <Input
              id="comment-author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </Field>
          <Field>
            <label htmlFor="comment-text">Comentário</label>
            <Input
              id="comment-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </Field>
          <ButtonRow>
            <Button type="submit">Comentar</Button>
          </ButtonRow>
        </form>
      </CommentsSection>
    </Page>
  );
}
