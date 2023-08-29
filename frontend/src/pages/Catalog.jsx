import { useEffect, useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../utils.js";
import { MdAdd, MdClose, MdRemove } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("Semua");
  const [editedProduct, setEditedProduct] = useState();
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
      <div className="flex flex-col m-4">
        <header className=" bg-col3 h-16 flex justify-evenly  rounded-lg  items-center m-4">
          <label className="m-5 ">
            Cari :
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </label>

          <label>
            Kategori:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Semua</option>
              <option>Walkman</option>
              <option>Camera</option>
            </select>
          </label>

          <button onClick={() => setIsCartOpen(true)}>
            <FiShoppingCart />
            {cart.reduce((a, p) => a + p.count, 0)}
          </button>
        </header>
        <div className="flex flex-wrap gap-5">
          {products && products.length === 0 ? (
            <p className="text-xl">Memuat Produk...</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-col2 w-fit flex  h-80 rounded-lg flex-col "
              >
                <img src={product.image} alt="" className="m-2 w-60" />
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-lg">{product.name_product}</h3>
                  <h3 className="text-md">Rp {product.price}</h3>
                </div>
                <button
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
                  <FiShoppingCart />
                </button>
              </div>
            ))
          )}
        </div>
        {isCartOpen && (
          <div className="bg-col3">
            <button onClick={() => setIsCartOpen(false)}>
              <MdClose />
            </button>
            <h1>Keranjang</h1>
            <table>
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
                    <td>{product.name}</td>
                    <td>{product.count.toLocaleString()}</td>
                    <td>
                      <button
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
                        <MdRemove />
                      </button>
                      <button
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
                        <MdAdd />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              Total bayar:{" "}
              {cart
                .reduce((a, p) => a + p.price * p.count, 0)
                .toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                })}
            </div>
          </div>
        )}
        {editedProduct && (
          <form
            className="dialog"
            onSubmit={(e) => {
              e.preventDefault();
              if (editedProduct.id) {
                setProducts(
                  products.map((product) =>
                    product.id === editedProduct.id ? editedProduct : product
                  )
                );
              } else {
                setProducts([...products, { ...editedProduct, id: idSquence }]);
                setIdSequence(idSquence + 1);
              }
              setEditedProduct(undefined);
            }}
          >
            <h1>{editedProduct.id ? "Edit" : "Buat"} Produk</h1>
            <label>
              Nama
              <input
                type="text"
                value={editedProduct.name}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, name: e.target.value })
                }
                autoFocus
              />
            </label>
            <label>
              Harga
              <input
                type="number"
                value={editedProduct.price}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    price: parseInt(e.target.value),
                  })
                }
              />
            </label>
            <label>
              Gambar
              <input
                type="text"
                value={editedProduct.image}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    image: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Kategori
              <select
                value={editedProduct.category}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    category: e.target.value,
                  })
                }
              >
                <option>Semua</option>
                <option>Laptop</option>
                <option>Smartphone</option>
                <option>Headset</option>
                <option>Watch</option>
              </select>
            </label>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="reset"
                variant="tonal"
                onClick={() => setEditedProduct(undefined)}
              >
                Batal
              </button>
              <button>Simpan</button>
            </div>
          </form>
        )}
      </div>
    );
  } else {
    <Navigate to={"/login"} />;
  }
}
