import { NavLink } from "react-router-dom";

import theme_icon from "../assets/theme-icon.svg";
import useTheme from "../store/ThemeContext";

const Header = () => {
  const { isDark, setIsDark } = useTheme();

  const themeChangeHandler = () => {
    setIsDark(!isDark);
  };

  let headerThemeClasses = "bg-white text-[#111517]";

  if (isDark) {
    headerThemeClasses = "bg-[#2B3844] text-white";
  }

  return (
    <div
      className={`flex justify-between fixed top-0 w-screen mx-auto px-2 lg:px-20 py-6 font-['Nunito Sans'] shadow-sm z-20 ${headerThemeClasses}`}
    >
      <NavLink to="/" className="text-sm lg:text-2xl font-extrabold">
        Where in the world?
      </NavLink>
      <button
        onClick={themeChangeHandler}
        className="text-xs lg:text-base font-semibold flex items-center gap-1"
      >
        <img src={theme_icon} className={`${!isDark && "invert"}`} alt="moon" />
        Dark Mode
      </button>
    </div>
  );
};

export default Header;
