import { useState } from "react";
import { Button, ButtonRow, ErrorText, Field, Input, Label, Textarea } from "./ui";
import type { PostFormValues } from "../types";

interface PostFormProps {
  initialValues?: PostFormValues;
  submitLabel: string;
  onSubmit: (values: PostFormValues) => Promise<void>;
  onCancel: () => void;
}

const emptyValues: PostFormValues = { title: "", author: "", description: "", content: "" };

export function PostForm({ initialValues, submitLabel, onSubmit, onCancel }: PostFormProps) {
  const [values, setValues] = useState<PostFormValues>(initialValues || emptyValues);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update<K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!values.title.trim() || !values.author.trim() || !values.content.trim()) {
      setError("Título, autor e conteúdo são obrigatórios.");
      return;
    }

    setError("");
    setSaving(true);
    try {
      await onSubmit(values);
    } catch {
      setError("Não foi possível salvar o post. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="title">Título</Label>
        <Input id="title" value={values.title} onChange={(e) => update("title", e.target.value)} />
      </Field>
      <Field>
        <Label htmlFor="author">Autor</Label>
        <Input id="author" value={values.author} onChange={(e) => update("author", e.target.value)} />
      </Field>
      <Field>
        <Label htmlFor="description">Descrição breve</Label>
        <Input
          id="description"
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Aparece na listagem de posts (opcional, gerado a partir do conteúdo se vazio)"
        />
      </Field>
      <Field>
        <Label htmlFor="content">Conteúdo</Label>
        <Textarea id="content" value={values.content} onChange={(e) => update("content", e.target.value)} />
      </Field>

      {error && <ErrorText>{error}</ErrorText>}

      <ButtonRow>
        <Button type="submit" disabled={saving}>
          {saving ? "Salvando..." : submitLabel}
        </Button>
        <Button type="button" $variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </ButtonRow>
    </form>
  );
}
