import { useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { api } from "../utils";

const colors = {
  primary: "#060606",
  background: "#E0E0E0",
  disabled: "#D9D9D9",
};

export default function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [user, setUser] = useOutletContext();

  if (user) {
    return (
      <main className="flex items-start py-20 px-20 gap-16 justify-center">
        <div className="relative w-1/2 h-full flex flex-col py-28">
          <div className="absolute top-[25%] left-[10%] flex flex-col"></div>

          <img
            src="./undraw_access_account_re_8spm.svg"
            className="max-w-[600px]  object-cover"
          />
        </div>
        <form
          className="m-auto bg-gray-100 p-8 rounded-3xl w-96 flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await api.post("/auth/login", login);

            if (response.ok) {
              alert(await response.text());
              const userResponse = await api.get("/auth/me");
              if (userResponse.ok) {
                const user = await userResponse.json();
                console.log(user);
                setUser(user);

                navigate("/");
              }
            } else {
              const message = await response.text();
              alert(message);
            }
          }}
        >
          <h1 className="text-center text-3xl">Login</h1>

          <h1 className="text-center text-lg">
            Selamat datang kembali! Silakan masuk untuk melanjutkan.
          </h1>
          <input
            type="email"
            placeholder="Email"
            label="Email"
            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            required
            autoFocus
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Kata Sandi"
            label="Kata sandi"
            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            required
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />

          <div className="w-full flex justify-between gap-10 my-4">
            <Link
              to="/register"
              className="w-full text-[#060606] font-semibold bg-col3   rounded-md my-2 p-4 text-center flex items-center justify-center cursor-pointer"
            >
              <button type="button">Buat akun</button>
            </Link>
            <button className="w-full text-[#060606] font-semibold bg-col3   rounded-md my-2 p-4 text-center flex items-center justify-center cursor-pointer">
              Login
            </button>
          </div>
        </form>
      </main>
    );
  } else {
    return <Navigate to="/" />;
  }
}
