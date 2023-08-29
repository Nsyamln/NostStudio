import { Navigate, useOutletContext } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useOutletContext();
  console.log(user);
  if (user) {
    return (
      <div className=" flex flex-col items-center py-14 px-60">
        <h1 className="text-3xl font-semibold">
          Selamat Datang , selamat Berbelanja
        </h1>
        <br />
        <img
          src="./undraw_add_to_cart_re_wrdo.svg"
          className="max-w-[700px]  object-cover"
        />
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
