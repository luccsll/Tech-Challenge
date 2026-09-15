import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

const Bar = styled.header`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

const Brand = styled(Link)`
  font-size: 1.25rem;
  font-weight: 700;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.95rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textMuted};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
  padding: 6px 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textMuted};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <Bar>
      <Brand to="/">Blog da Turma</Brand>
      <Nav>
        <NavLink to="/">Posts</NavLink>
        {isAuthenticated ? (
          <>
            <NavLink to="/admin">Administração</NavLink>
            <NavLink to="/posts/novo">Nova postagem</NavLink>
            <span>Olá, {user?.name.split(" ")[0]}</span>
            <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
          </>
        ) : (
          <NavLink to="/login">Entrar</NavLink>
        )}
      </Nav>
    </Bar>
  );
}
