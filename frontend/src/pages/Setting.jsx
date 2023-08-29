import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { MdOutlinePlace } from "react-icons/md";
import { BsCalendarWeek, BsInstagram } from "react-icons/bs";
import { ThemeContext } from "../App";
import { useContext } from "react";
import { Navigate, useOutletContext } from "react-router-dom";

export default function Setting() {
  const handleSettingClick = () => {
    alert("Coming soon!");
  };

  const [user, setUser] = useOutletContext();
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  if (user) {
    return (
      <div
        className={`flex justify-center flex-wrap m-5 ${
          theme === "dark" ? "bg-col4 text-white" : "bg-white"
        }`}
      >
        <img
          src="./settings.svg"
          className="xl:max-w-[1200px] lg:max-w-[1000px]"
          alt=""
        />
        <div className="max-w-[1000px] my-2">
          <h1 className="text-2xl sm:text-xl font-semibold">
            Selamat datang di NoStudio!
          </h1>
          <p className="text-justify">
            Kami adalah destinasi yang menghidupkan kembali kenangan indah dari
            masa lalu. Di Nostalgia Studio, kami percaya bahwa setiap momen
            memiliki cerita yang tak terlupakan, dan kami berdedikasi untuk
            membawa Anda kembali ke waktu yang penuh dengan kenangan yang
            berharga.
          </p>
          <br />
          <hr className="text-col3  py-2" />
          <div>
            <h1 className="text-lg font-semibold">Profile Kami</h1>
            <div className="flex flex-row items-center my-1 gap-2">
              <MdOutlinePlace size={30} />
              <h3>Jl Cikapundung No 23 Kota Bandung, Indonesia</h3>
            </div>
            <div className="flex flex-row items-center m-1 gap-3">
              <BsCalendarWeek size={24} />
              <h3>Sabtu - Kamis</h3>
            </div>
            <div className="flex flex-row items-center my-2 ml-1 gap-3">
              <BsInstagram size={24} />
              <h3>@noStudio_</h3>
            </div>
          </div>
          <br />
          <hr className="text-col3  py-2" />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Theme</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="light"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="dark"
                control={<Radio />}
                label="Dark"
                checked={theme === "dark"}
                onChange={() => handleThemeChange("dark")}
              />
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="Light"
                checked={theme === "light"}
                onChange={() => handleThemeChange("light")}
              />
              {/* <FormControlLabel
                value="earth"
                control={<Radio />}
                label="Earth Girl"
              /> */}
            </RadioGroup>
          </FormControl>

          <br />
          <hr className="text-col3  py-2" />
          <h3 className="text-md text-gray-600 mb-4">Application Version</h3>
          <div className="flex gap-4">
            <button
              variant="contained"
              className={` w-20 rounded-md ${
                theme === "light" ? "bg-col3 text-white" : "bg-col3 text-black"
              }`}
              disabled
            >
              versi 1.0
            </button>
            <Button variant="contained" onClick={() => handleSettingClick()}>
              Versi 2.0
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
