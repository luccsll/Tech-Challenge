import styled from "styled-components";

export const Page = styled.main`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 24px 16px 64px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Input = styled.input`
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 1px;
  }
`;

export const Textarea = styled.textarea`
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  font-family: inherit;
  min-height: 220px;
  resize: vertical;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 1px;
  }
`;

export const Button = styled.button<{ $variant?: "primary" | "danger" | "ghost" }>`
  padding: 10px 18px;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid transparent;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;

  background: ${({ theme, $variant }) =>
    $variant === "danger"
      ? theme.colors.danger
      : $variant === "ghost"
      ? "transparent"
      : theme.colors.primary};
  color: ${({ theme, $variant }) => ($variant === "ghost" ? theme.colors.text : "#fff")};
  border-color: ${({ theme, $variant }) => ($variant === "ghost" ? theme.colors.border : "transparent")};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.9rem;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;
