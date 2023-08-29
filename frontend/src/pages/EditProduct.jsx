import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utils.js";
import { BiSolidEdit } from "react-icons/bi";

export default function EditProduct() {
  const [products, setProducts] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((response) => response.json())
      .then((products) => setProducts(products));
  }, [id]);

  console.log(products);
  return (
    <main>
      {products ? (
        <div className="container max-w-md mx-auto m-10 bg-gray-300 p-3 rounded w-full">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const message = await api(
                `/products/${products.id}`,
                "PUT",
                products
              );
              alert(message);
              navigate("/");
            }}
          >
            <span className=" flex items-center">
              <h1 className="text-2xl font-semibold mb-4 mt-10">
                <BiSolidEdit size={36} />
                Edit Product
              </h1>
            </span>
            <label className="block">
              Nama :
              <input
                type="text"
                value={products.name_product}
                onChange={(e) =>
                  setProducts({ ...products, name_product: e.target.value })
                }
                required
                className="w-full p-2 border rounded"
              />
            </label>

            <label className="block">
              Gambar :
              <input
                type="text"
                value={products.image}
                onChange={(e) =>
                  setProducts({ ...products, image: e.target.value })
                }
                required
                className="w-full p-2 border rounded"
              />
            </label>

            <label className="block">
              Harga :
              <input
                type="text"
                value={products.price}
                onChange={(e) =>
                  setProducts({ ...products, price: parent(e.target.value) })
                }
                required
                className="w-full p-2 border rounded"
              />
            </label>
            <div className="container flex gap-2 ">
              <label className="block">
                Stok :
                <input
                  type="text"
                  value={products.stock}
                  onChange={(e) =>
                    setProducts({ ...products, stock: parent(e.target.value) })
                  }
                  required
                  className="w-full p-2 border rounded"
                />
              </label>

              <label className="block">
                Kelengkapan :
                <input
                  type="text"
                  value={products.completeness}
                  onChange={(e) =>
                    setProducts({ ...products, completeness: e.target.value })
                  }
                  required
                  className="w-full p-2 border rounded"
                />
              </label>

              <label className="block">
                Deskripsi:
                <input
                  type="text"
                  value={products.description}
                  onChange={(e) =>
                    setProducts({ ...products, description: e.target.value })
                  }
                  required
                  className="w-full p-2 border rounded"
                />
              </label>
            </div>

            <button
              className="bg-col3 font-semibold py-2 px-4 rounded flex mt-4"
              onClick={async () => {
                if (window.confirm(`Apakah data Produk sudah benar?`)) {
                  const response = await api.put(
                    `/products/${products.id}`,
                    products
                  );
                  const message = await response.text();
                  alert(message);
                }
              }}
            >
              Save
            </button>
          </form>
        </div>
      ) : (
        "Loading..."
      )}
    </main>
  );
}
