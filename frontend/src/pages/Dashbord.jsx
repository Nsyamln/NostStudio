import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillPlusSquare } from "react-icons/ai";
import { Navigate, useOutletContext, useParams } from "react-router-dom";
import { api } from "../utils";

export default function Dashbord() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [editedProduct, setEditedProduct] = useState();
  const { id } = useParams();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNewProduct({});
    try {
      const response = await api.post("/products/create", newProduct);
      const message = await response.text();
      if (response.ok) {
        const productsResponse = await api.get("/products");
        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          setProducts(productsData.products);
        }
        alert(message);
      } else {
        alert("Error: " + message);
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("An error occurred while submitting the product.");
    }
  };

  if (user) {
    return (
      <div className="px-20 pb-10">
        <form
          action=""
          className="py-10"
          onSubmit={async (e) => {
            e.preventDefault();
            setNewProduct({});
            const res1 = await api.post("/products/create", newProduct);
            const message = await res1.text();
            const res2 = await api.get("/products");
            const prod = await res2.json();
            setNewProduct(prod);
            alert(message);
          }}
        >
          <div className="flex gap-5 flex-wrap ">
            <TextField
              className="w-96"
              id="outlined-basic"
              label="Name"
              variant="outlined"
              required
              value={newProduct.name ?? ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <TextField
              className="w-96"
              id="outlined-basic"
              label="Link Image"
              variant="outlined"
              required
              value={newProduct.image ?? ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <TextField
              className="w-96"
              id="outlined-basic"
              label="Price"
              variant="outlined"
              required
              value={newProduct.price ?? ""}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: parseInt(e.target.value),
                })
              }
            />
            <TextField
              className="w-96"
              id="outlined-basic"
              label="Stock"
              variant="outlined"
              required
              value={newProduct.stock ?? ""}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  stock: parseInt(e.target.value),
                })
              }
            />
            <TextField
              className="w-96"
              id="outlined-basic"
              label="Completenes"
              variant="outlined"
              required
              value={newProduct.completeness ?? ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, completeness: e.target.value })
              }
            />
            <TextField
              className="w-96"
              id="outlined-basic"
              label="Description"
              variant="outlined"
              required
              value={newProduct.description ?? ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </div>
          <button type="submit" className="  my-6 ">
            <AiFillPlusSquare size={35} title="Tambah data" />
          </button>
        </form>

        <table className="max-w-screen-2xl ">
          <thead>
            <tr className="bg-col3">
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Gambar</th>
              <th className="px-4 py-2">Harga</th>
              <th className="px-4 py-2">Stok</th>
              <th className="px-4 py-2">Kelengkapan</th>
              <th className="px-4 py-2">Deskripsi</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t ">
                <td className="px-4 py-2">{product.name_product}</td>
                <td className="px-4 py-2">{product.image}</td>
                <td className="px-4 py-2">{product.price}</td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2">{product.completeness}</td>
                <td className="px-4 py-2">{product.description}</td>
                <td className="px-4 py-2  ">
                  <div className="flex flex-wrap gap-6">
                    <button
                      onClick={async () => {
                        if (
                          confirm(
                            `Apakah Anda yakin ingin menghapus produk ini (${product.name_product})?`
                          )
                        ) {
                          const res1 = await api.delete(
                            `/products/${product.id}`
                          );
                          const message = await res1.text();
                          const res2 = await api.get("/products");
                          const prod = await res2.json();
                          setProducts(prod);
                          alert(message);
                        }
                      }}
                    >
                      <AiFillDelete size={24} />
                    </button>
                    <button onClick={() => setEditedProduct(product)}>
                      <AiFillEdit size={24} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editedProduct && (
          <form
            className="dialog"
            onSubmit={(e) => {
              e.preventDefault();
              setProducts(
                products.map((product) =>
                  product.id === editedProduct.id ? editedProduct : product
                )
              );
              setEditedProduct(undefined);
            }}
          >
            <h1>Edit Produk</h1>
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
              Gambar
              <input
                type="text"
                value={editedProduct.image}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, image: e.target.value })
                }
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
              Kelengkapan
              <input
                type="number"
                value={editedProduct.completeness}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    completeness: e.target.value,
                  })
                }
              />
            </label>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                type="reset"
                variant="tonal"
                onClick={() => setEditedProduct(undefined)}
              >
                Batal
              </Button>
              <Button>Simpan</Button>
            </div>
          </form>
        )}
      </div>
    );
  } else {
    <Navigate to={"/login"} />;
  }
}
