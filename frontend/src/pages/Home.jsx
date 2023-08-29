import { Navigate, useOutletContext } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useOutletContext();
  console.log(user);
  if (user) {
    return (
      <div className=" flex flex-col items-center p-28">
        <h1>Selamat Datang , selamat Berbelanja</h1>
        <img
          src="./undraw_add_to_cart_re_wrdo.svg"
          className="max-w-[600px]  object-cover"
        />
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
