import { Link } from "react-router-dom";
import styled from "styled-components";
import type { Post } from "../types";

const Card = styled(Link)`
  display: block;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 20px;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.15s ease, transform 0.15s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(20, 25, 40, 0.08);
    transform: translateY(-2px);
  }
`;

const Title = styled.h2`
  margin: 0 0 6px;
  font-size: 1.25rem;
`;

const Meta = styled.p`
  margin: 0 0 10px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
`;

export function PostCard({ post }: { post: Post }) {
  return (
    <Card to={`/posts/${post.id}`}>
      <Title>{post.title}</Title>
      <Meta>
        Por {post.author} · {new Date(post.createdAt).toLocaleDateString("pt-BR")}
      </Meta>
      <Description>{post.description}</Description>
    </Card>
  );
}
