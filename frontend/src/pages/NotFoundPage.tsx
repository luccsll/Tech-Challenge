import { Link } from "react-router-dom";
import { Page } from "../components/ui";

export function NotFoundPage() {
  return (
    <Page>
      <h1>Página não encontrada</h1>
      <Link to="/">Voltar para a lista de posts</Link>
    </Page>
  );
}
