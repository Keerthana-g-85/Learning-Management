import { useState, createContext, type ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

type Context = {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
};

export const ThemeContext = createContext<Context>({
  theme: "light",
  setTheme: () => {},
});
export function Theme({ children }: { children: ReactNode }) {
  const user = useSelector((state: any) => state.login.user);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`${user.id}`, theme);
    }
  }, [theme]);

  useEffect(() => {
    if (user.id) {
      const themeLocal = localStorage.getItem(`${user.id}`);
      console.log(themeLocal);
      if (themeLocal === "light" || themeLocal === "dark") {
        setTheme(themeLocal);
      }
    }
  }, [user.id]);

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}
