import { useEffect, useState } from "react";
import { getLocal, setLocal } from "../../untils";

const setTheme = () => {
  const [theme, setTheme] = useState("emerald");
  useEffect(() => {
    document
      ?.querySelector("html")
      ?.setAttribute("data-theme", getLocal("data-theme"));
    setTheme(getLocal("data-theme"));
  }, []);
  const handleChangeTheme = (newTheme: string) => {
    document?.querySelector("html")?.setAttribute("data-theme", newTheme);
    localStorage && setLocal("data-theme", newTheme);
    setTheme(newTheme);
  };
  return {
    theme,
    handleChangeTheme,
  };
};
export default setTheme;
