import { onMounted, ref } from "vue";

export type ThemeKey = "system" | "light" | "dark" | "terminal";

export const STORAGE_KEY = "theme";
export const THEMES: ThemeKey[] = ["system", "light", "dark", "terminal"];

export function resolveTheme(key: ThemeKey) {
  if (key === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return key;
}

export function useTheme() {
  const current = ref<ThemeKey>("system");

  const apply = (key: ThemeKey) => {
    current.value = key;
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, key);
    const resolved = resolveTheme(key);
    document.documentElement.dataset.theme = resolved;
  };

  const cycle = () => {
    const index = THEMES.indexOf(current.value);
    const next = THEMES[(index + 1) % THEMES.length];
    apply(next);
  };

  onMounted(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const safeTheme = stored && THEMES.includes(stored as ThemeKey) ? (stored as ThemeKey) : "system";
    current.value = safeTheme;
    apply(safeTheme);
  });

  return { current, themes: THEMES, apply, cycle };
}
