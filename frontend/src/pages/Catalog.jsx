import { useEffect, useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import { api } from "../utils.js";
import { MdAdd, MdClose, MdRemove } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import IconButton from "../components/IconButton";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const user = useOutletContext()[0];
  useEffect(() => {
    api
      .get("/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  if (user) {
    return (
      <div className="flex flex-col m-2">
        <header className=" bg-col3 h-16 flex justify-evenly  rounded-lg  items-center m-4">
          <label className="m-5 ">
            Cari :
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </label>

          <IconButton onClick={() => setIsCartOpen(true)}>
            <FiShoppingCart />
            {cart.reduce((a, p) => a + p.count, 0)}
          </IconButton>
        </header>
        <div className="flex flex-wrap m-4 gap-5">
          {products && products.length === 0 ? (
            <p className="text-xl">Memuat Produk...</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-col2 w-fit flex  h-80 rounded-lg flex-col "
              >
                <img src={product.image} alt="" className="m-2 w-52" />
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-lg">{product.name_product}</h3>
                  <h3 className="text-md">Rp {product.price}</h3>
                </div>
                <div className="flex px-4  justify-between">
                  <button
                    onClick={() => {
                      <div className="bg-panacotta absolute flex flex-col gap-2 p-6 text-center rounded-xl top-2/4 left-2/4 min-w-[500px]">
                        <h1>Kelengkapan :</h1>
                        <p>{product.completeness}</p>
                        <h1>Deskripsi:</h1>
                        <p>{product.description}</p>
                      </div>;
                    }}
                    className="bg-panacotta w-10 flex items-center justify-center h-10 rounded-lg "
                  >
                    <AiOutlineEye size={20} />
                  </button>
                  <IconButton
                    className="bg-panacotta w-10 flex items-center justify-center h-10 rounded-lg"
                    onClick={() => {
                      if (cart.find((p) => p.id === product.id)) {
                        setCart(
                          cart.map((p) =>
                            p.id === product.id
                              ? {
                                  ...p,
                                  count: p.count + 1,
                                }
                              : p
                          )
                        );
                      } else {
                        setCart([...cart, { ...product, count: 1 }]);
                      }
                    }}
                  >
                    <FiShoppingCart size={20} />
                  </IconButton>
                </div>
              </div>
            ))
          )}
        </div>
        {isCartOpen && (
          <div className="bg-panacotta absolute flex flex-col gap-2 p-6 text-center rounded-xl top-2/4 left-2/4 min-w-[500px]">
            <button onClick={() => setIsCartOpen(false)}>
              <MdClose size={20} />
            </button>
            <h1 className="text-left text-2xl font-semibold">Keranjang</h1>
            <table className="text-lg border-black">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Jumlah</th>
                  <th>Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name_product}</td>
                    <td>{product.count.toLocaleString()}</td>
                    <td>
                      <IconButton
                        onClick={() => {
                          if (product.count > 1) {
                            setCart(
                              cart.map((p) =>
                                p.id === product.id
                                  ? { ...p, count: p.count - 1 }
                                  : p
                              )
                            );
                          } else {
                            setCart(cart.filter((p) => p.id !== product.id));
                          }
                        }}
                        title="Kurangi"
                      >
                        <MdRemove size={20} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setCart(
                            cart.map((p) =>
                              p.id === product.id
                                ? { ...p, count: p.count + 1 }
                                : p
                            )
                          );
                        }}
                        title="Tambah"
                      >
                        <MdAdd size={20} />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-xl flex justify-between my-5 mb-0">
              Total bayar:{" "}
              {cart
                .reduce((a, p) => a + p.price * p.count, 0)
                .toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                })}
              <button className="w-20 h-10 bg-col2 rounded-lg">Bayar</button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    <Navigate to={"/login"} />;
  }
}
