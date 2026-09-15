import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchPosts } from "../api/posts";
import { PostCard } from "../components/PostCard";
import { SearchBar } from "../components/SearchBar";
import { Page } from "../components/ui";
import type { Post } from "../types";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const EmptyState = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 32px;
  text-align: center;
`;

export function PostListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      fetchPosts(search.trim() || undefined)
        .then(setPosts)
        .finally(() => setLoading(false));
    }, 250);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <Page>
      <Title>Posts recentes</Title>
      <SearchBar value={search} onChange={setSearch} />

      <List>
        {loading && <EmptyState>Carregando posts...</EmptyState>}
        {!loading && posts.length === 0 && (
          <EmptyState>Nenhum post encontrado para essa busca.</EmptyState>
        )}
        {!loading && posts.map((post) => <PostCard key={post.id} post={post} />)}
      </List>
    </Page>
  );
}
