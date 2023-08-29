import express from "express";
import conn from "../db.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  await conn.query(
    `INSERT INTO products VALUES ('${req.body.id}','${req.body.name}','${req.body.image}','${req.body.price}','${req.body.stock}','${req.body.completeness}','${req.body.description}')`
  );
  res.send("Product berhasil disimpan");
});

// tampilkan semua
router.get("/", async (_req, res) => {
  const products = await conn.query("SELECT * FROM products");
  // console.log(products);
  res.json(products);
});

// tampilkan satu berdasarkan ID
router.get("/:id", async (req, res) => {
  const prepare = await conn.prepare("SELECT * FROM products WHERE id = ?");
  const product = (await prepare.execute([req.params.id]))[0];
  res.json(product);
});

// edit
router.put("/:id", async (req, res) => {
  // const prepare = await conn.prepare(
  //   "UPDATE products SET name = ?, image = ?, price=?,stock=?, completeness=?, description = ? WHERE id = ?"
  // );

  await conn.query(
    `UPDATE products SET name_product = '${req.body.name_product}', image='${req.body.image}',price='${req.body.price}',stock='${req.body.stock}',completeness='${req.body.completeness}',description = '${req.body.description}' WHERE id = ${req.params.id}`
  );
  res.send("product berhasil disimpan.");
});

// hapus berdasarkan ID
router.delete("/:id", async (req, res) => {
  try {
    const prepare = await conn.prepare("DELETE FROM products WHERE id = ?");
    await prepare.execute([req.params.id]);
    res.send("Product berhasil dihapus.");
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

// hapus semua

export default router;
