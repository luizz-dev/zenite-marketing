/**
 * Heurística simples para decidir se o dispositivo aguenta uma cena
 * WebGL (react-three-fiber) sem travar: poucos núcleos de CPU, pouca
 * RAM reportada, ou falha ao criar contexto WebGL = usa o fallback.
 *
 * Não é perfeito (é uma estimativa), mas evita mandar Three.js pra
 * celulares/notebooks fracos.
 */
export function hasAdequateGpu(): boolean {
  if (typeof window === "undefined") return false;

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory =
    (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4;

  if (cores < 4 || memory < 4) return false;

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    return !!gl;
  } catch {
    return false;
  }
}