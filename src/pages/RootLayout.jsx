import { useEffect } from "react";

import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import useTheme from "../store/ThemeContext";

const RootLayout = () => {
  const { isDark, setIsDark } = useTheme();

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove("bg-[#FAFAFA]", "text-black");
      document.body.classList.add("bg-[#202C36]", "text-white");
    } else {
      document.body.classList.remove("bg-[#202C36]", "text-white");
      document.body.classList.add("bg-[#FAFAFA]", "text-black");
    }
  }, [isDark]);

  return (
    <>
      <Header themeState={{ isDark, setIsDark }} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
