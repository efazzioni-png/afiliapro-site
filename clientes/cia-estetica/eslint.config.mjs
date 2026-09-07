import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/**
 * ESLint 9 (flat config) com as regras oficiais do Next.js:
 * core-web-vitals (performance e acessibilidade) + TypeScript.
 */
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts', 'scripts/**'],
  },
];

export default eslintConfig;
