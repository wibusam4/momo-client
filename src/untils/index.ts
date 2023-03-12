export const setLocal = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getLocal = (key: string) => {
  return localStorage.getItem(key) || "bumblebee";
};

export const dataTheme = [
  "dracula",
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];
