import express from "express";
import conn from "../db.js";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();
router.use(cookieParser());

router.get("/tampil", async (_req, res) => {
  const tampil = await conn.query(`select * from users`);
  res.send(tampil);
});

router.post("/registrasi", async (req, res) => {
  console.log(req.body);
  const baris = await conn.query(
    `select * from users where email = '${req.body.email}'`
  );

  console.log(baris);
  if (baris.length === 1) {
    res.send("Email sudah terdaftar");
  } else {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(req.body.password, salt);
    await conn.query(
      `INSERT INTO users VALUES(default,'${req.body.name}','${req.body.email}','${hash}','${req.body.role}','${req.body.address}','${req.body.phone_number}')`
    );
    res.send("Berhasil Registrasi");
  }
});

router.post("/login", async (req, res) => {
  //   console.log("sssss");
  const rows = await conn.query(
    `select * from users where email = '${req.body.email}'`
  );
  if (rows.length > 0) {
    // const cek =
    if (await bcrypt.compare(req.body.password, rows[0].password)) {
      // if (rows[0].password === req.body.password) {
      const token = jwt.sign(rows[0], process.env.SECRET_KEY);
      //   console.log(token);
      res.cookie("jwt", token, {
        httpOnly: true,
      });
      res.send("berhasil login");
    } else {
      res.status(401);
      res.send("password salah");
    }
  } else {
    res.status(404);
    res.send("tidak ditemukan");
  }
});

// router.use((req,res,next)=>{
//     let authorization = false;
//     if(req.path === "/api/login"){
//         next();
//     }else if(req.body.cookie === true){
//         try {
//             req.me = jwt.verify(req.cookies.token,"secret");
//             authorization = true;
//         } catch (error) {
//             res.clearCookie("token");
//         }
//     }
//     if(authorization === true){
//         if(req.path === "/login"){
//             res.redirect("/");
//         }else{
//             if(req.path.startsWith("/login")){
//                 next();
//             }else{
//                 if(req.path.startsWith("/api")){
//                     res.statusCode(401);
//                     res.send("Anda harus Login terlebih dahulu");
//                 }else{
//                     res.redirect("/login");
//                 }
//             }
//         }
//     }
// });

router.use(authMiddleware);

router.get("/me", (req, res) => {
  res.json(req.user);
});

router.post("/logout", (_req, res) => {
  res.clearCookie("token").send("Logout berhasil");
});

export default router;
