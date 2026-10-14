import { ref, onMounted } from "vue";

export type ThemeKey = "system" | "light" | "dark" | "terminal";

const STORAGE_KEY = "theme";
const THEMES: ThemeKey[] = ["system", "light", "dark", "terminal"];

function resolveTheme(key: ThemeKey): string {
  if (key === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return key;
}

export function useTheme() {
  const current = ref<ThemeKey>("system");

  function apply(key: ThemeKey) {
    current.value = key;
    localStorage.setItem(STORAGE_KEY, key);
    document.documentElement.dataset.theme = resolveTheme(key);
  }

  function cycle() {
    const idx = THEMES.indexOf(current.value);
    apply(THEMES[(idx + 1) % THEMES.length]);
  }

  onMounted(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeKey | null;
    current.value = stored && THEMES.includes(stored) ? stored : "system";
  });

  return { current, themes: THEMES, apply, cycle };
}
