export function categorizeDependencies(
  deps?: Record<string, string>
): Record<string, { [dep: string]: string }> {
  if (!deps) return {};

  const categories: Record<string, { [dep: string]: string }> = {
    Framework: {},
    UI: {},
    StateManagement: {},
    BuildTools: {},
    Testing: {},
    Utilities: {},
    Others: {},
  };

  Object.entries(deps).forEach(([dep, ver]) => {
    if (
      ["react", "next", "vue", "svelte", "angular"].some((f) =>
        dep.toLowerCase().includes(f)
      )
    ) {
      categories.Framework[dep] = ver;
    } else if (
      ["tailwind", "bootstrap", "chakra", "material"].some((ui) =>
        dep.toLowerCase().includes(ui)
      )
    ) {
      categories.UI[dep] = ver;
    } else if (
      ["redux", "zustand", "mobx", "recoil"].some((s) =>
        dep.toLowerCase().includes(s)
      )
    ) {
      categories.StateManagement[dep] = ver;
    } else if (
      ["webpack", "vite", "babel", "eslint", "prettier", "ts-node"].some((b) =>
        dep.toLowerCase().includes(b)
      )
    ) {
      categories.BuildTools[dep] = ver;
    } else if (
      ["jest", "mocha", "chai", "vitest", "cypress"].some((t) =>
        dep.toLowerCase().includes(t)
      )
    ) {
      categories.Testing[dep] = ver;
    } else if (
      ["lodash", "axios", "dayjs", "date-fns"].some((u) =>
        dep.toLowerCase().includes(u)
      )
    ) {
      categories.Utilities[dep] = ver;
    } else {
      categories.Others[dep] = ver;
    }
  });

  return categories;
}
