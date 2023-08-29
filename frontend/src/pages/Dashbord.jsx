import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillPlusSquare } from "react-icons/ai";
import { useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../utils";

export default function Dashbord() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [editedProduct, setEditedProduct] = useState();

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
  }, [user, navigate]);

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

  return (
    <div className="px-20 pb-10">
      <form action="" className="py-10" onSubmit={handleSubmit}>
        <div className="flex gap-5 flex-wrap ">
          <TextField
            className="w-96"
            id="outlined-basic"
            label="Name"
            variant="outlined"
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
            value={newProduct.price ?? ""}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: parseInt(e.target.value) })
            }
          />
          <TextField
            className="w-96"
            id="outlined-basic"
            label="Completenes"
            variant="outlined"
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
            value={newProduct.description ?? ""}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
        </div>
      </form>
      <button className=" py-0 pb-4 px-5 ">
        <AiFillPlusSquare size={35} title="Tambah data" />
      </button>

      <table className="max-w-screen-2xl ">
        <thead>
          <tr className="bg-col3">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t ">
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">{p.image}</td>
              <td className="px-4 py-2">{p.price}</td>
              <td className="px-4 py-2">{p.category}</td>
              <td className="px-4 py-2  ">
                <button className="flex flex-wrap gap-6">
                  <AiFillDelete size={24} />

                  <AiFillEdit size={24} />
                </button>
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
                setEditedProduct({ ...editedProduct, image: e.target.value })
              }
              autoFocus
            />
          </label>
          <label>
            Kategori
            <select
              value={editedProduct.category}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, category: e.target.value })
              }
            >
              <option value="semua">Semua</option>
              <option value="laptop">Laptop</option>
              <option value="smartphone">Smartphone</option>
              <option value="headset">Headset</option>
              <option value="watch">Watch</option>
              <option value="tablet">Tablet</option>
            </select>
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
}
