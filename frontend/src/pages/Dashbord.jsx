import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillPlusSquare } from "react-icons/ai";
import { Link, Navigate, useOutletContext, useParams } from "react-router-dom";
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
                    <Link to="/editproduct">
                      <button>
                        <AiFillEdit size={24} />
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    <Navigate to={"/login"} />;
  }
}
