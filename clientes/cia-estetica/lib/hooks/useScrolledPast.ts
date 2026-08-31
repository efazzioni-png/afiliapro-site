'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Informa se a página já passou de um determinado ponto de rolagem.
 *
 * Usa `useSyncExternalStore`, a API do React para ler estado de sistemas
 * externos: evita cascata de renders (ao contrário de useEffect + setState),
 * não quebra a hidratação (no servidor devolve `false`) e mantém apenas um
 * listener por componente.
 */
export function useScrolledPast(threshold: number): boolean {
  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener('scroll', onStoreChange, { passive: true });
    return () => window.removeEventListener('scroll', onStoreChange);
  }, []);

  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
