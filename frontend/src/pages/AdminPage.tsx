import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deletePost, fetchPosts } from "../api/posts";
import { Button } from "../components/ui";
import { Page } from "../components/ui";
import type { Post } from "../types";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;

  th, td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  th {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.85rem;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

export function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    fetchPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este post?")) return;
    await deletePost(id);
    setPosts((prev) => prev.filter((post) => post.id !== id));
  }

  return (
    <Page>
      <h1>Administração de postagens</h1>
      {loading && <p>Carregando...</p>}

      {!loading && (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.author}</td>
                  <td>{new Date(post.createdAt).toLocaleDateString("pt-BR")}</td>
                  <td>
                    <Actions>
                      <Link to={`/posts/${post.id}/editar`}>
                        <Button $variant="ghost">Editar</Button>
                      </Link>
                      <Button $variant="danger" onClick={() => handleDelete(post.id)}>
                        Excluir
                      </Button>
                    </Actions>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </Page>
  );
}
