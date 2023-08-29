import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../utils.js";
import { MdAdd, MdClose, MdRemove, MdShoppingCart } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";

export default function Catalog() {
  // const navigate = useNavigate();
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
        setProducts(data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  console.log(products);
  if (user) {
    return (
      // <h1>sasasa</h1>
      <div className="">
        <header className="w-full bg-col3 h-16 flex flex-row rounded-lg gap-5 items-center m-4">
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
        <main>
          {console.log(products)}
          {products?.map((product, i) => (
            <div key={i}>
              <img src="product.image" alt="" />
              <div>
                <h3>{product.name}</h3>
                <h3>{product.price}</h3>
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
              ></button>
              onEdit={() => setEditedProduct(product)}
              onDelete=
              {() => {
                if (
                  confirm(
                    `Apakah Anda yakin ingin menghapus produk ini (${product.name})?`
                  )
                ) {
                  setProducts(products.filter((p) => p.id !== product.id));
                }
              }}
            </div>
          ))}
        </main>
        {/* <footer>
          <label>
            Produk per halaman:
            <input
              type="number"
              value={productsPerPage}
              onChange={(e) => setProductsPerPage(parseInt(e.target.value))}
            />
          </label>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Sebelumnya
          </button>
          {filteredSortedProducts
            .filter((_product, i) => i % productsPerPage === 0)
            .map((_product, i) => (
              <button
                key={i}
                className="page-number"
                onClick={() => setPage(i + 1)}
                disabled={i + 1 === page}
              >
                {i + 1}
              </button>
            ))}
          <button
            onClick={() => setPage(page + 1)}
            disabled={
              page === Math.ceil(filteredSortedProducts.length / productsPerPage)
            }
          >
            Berikutnya
          </button>
        </footer> */}
        {isCartOpen && (
          <div className="card dialog">
            <button variant="tonal" onClick={() => setIsCartOpen(false)}>
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

        {/* <div className="flex justify-center my-4">
        <Pagination count={10} size="large" shape="rounded" />
      </div> */}
      </div>
    );
  } else {
    <Navigate to={"/login"} />;
  }
}
