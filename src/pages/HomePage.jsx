import { useState } from "react";
import useTheme from "../store/ThemeContext";

import Inputs from "../components/Inputs";
import Card from "../UI/Card";

const HomePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [regionValue, setRegionValue] = useState("");

  const { isDark } = useTheme();

  return (
    <div className="py-32">
      <Inputs
        isDark={isDark}
        value={{ searchValue, setSearchValue, setRegionValue }}
      />
      <Card isDark={isDark} value={{ searchValue, regionValue }} />
    </div>
  );
};

export default HomePage;
