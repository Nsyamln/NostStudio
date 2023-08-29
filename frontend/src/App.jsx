import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { createContext, useEffect, useState } from "react";
import { api } from "./utils.js";

export const ThemeContext = createContext({
  Theme: null,
  setTheme: () => {},
});
export default function App() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState();
  // const navigate = Navigate();
  useEffect(() => {
    api
      .get("/auth/me")
      .then((me) => {
        if (!me) {
          console.log("sss");
          setUser(null);
        } else {
          console.log("aaaa");
          setUser(me);
        }
      })
      .catch((err) => {
        // navigate("/login");
        console.log(err);
      });
  }, [user?.id]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="flex">
        <Sidebar />
        <div className={theme === "light" ? "bg-white" : "bg-col4 text-white"}>
          <Outlet context={[user, setUser]} />
        </div>
      </div>
      <Footer />
    </ThemeContext.Provider>
  );
}
