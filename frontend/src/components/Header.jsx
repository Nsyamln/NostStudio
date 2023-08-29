import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className=" flex bg-panacotta h-20 justify-between align-center">
      <Link>NostStudio</Link>
      <Link>Blog</Link>
      <Link>About</Link>
      <Link>Cart</Link>
    </div>
  );
}
