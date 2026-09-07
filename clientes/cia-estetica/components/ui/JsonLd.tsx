/**
 * Injeta um bloco JSON-LD no HTML.
 * O conteúdo vem sempre de `lib/schema.ts` (dados próprios, nunca de input
 * do usuário), então a serialização é segura.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
