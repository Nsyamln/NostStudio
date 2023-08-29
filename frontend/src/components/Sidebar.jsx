import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { GrCatalog } from "react-icons/gr";

const Sidebar = () => {
  const [isLogout, setIsLogout] = useState(false);
  const handleLogout = () => {};
  const menus = [
    {
      name: "dashboard",
      link: "/dashbord",
      icon: MdOutlineDashboard,
    },
    { name: "My Profile", link: "/myprofile", icon: AiOutlineUser },
    { name: "Catalog", link: "/catalog", icon: GrCatalog },
    { name: "Setting", link: "/setting", icon: RiSettings4Line },
    { name: "Logout", link: "/logout", icon: BiLogOut },
  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6">
      <div
        className={`bg-gray-100 min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-black px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div>
          <img src="./logo.png" alt="" />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      {/* {isLogout && (
        <div>
          <h1>Yakin ingin Logout?</h1>
          <button onClick={() => handleLogout()}>Ya</button>
          <button>Tidak</button>
        </div>
      )} */}
    </section>
  );
};

export default Sidebar;
