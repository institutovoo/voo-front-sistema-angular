export function lerJsonDoStorage<T>(chave: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(chave);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function salvarJsonNoStorage<T>(chave: string, valor: T): void {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch {}
}
