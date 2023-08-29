import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import authRouter from "./routes/auth.js";
import productsRouter from "./routes/products.js";

export const app = express();

// middlewares
app.use(cors({ origin: "http://localhost:5173",credentials:true }));
app.use(express.json()); // membaca body
app.use(cookieParser());


// membuat route (dengan objek Router)
const router = express.Router();
app.use("/api", router);

router.use("/auth",authRouter);
router.use("/products", productsRouter);

const port = 3000;
app.listen(port,()=>
console.log(`Server berjalan di http://localhost:${port}.`)
)
