import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    try {
      console.log(jwt.verify(token, process.env.SECRET_KEY));
      req.user = jwt.verify(token, process.env.SECRET_KEY);
      console.log(req.user);
      if (req.method === "GET" || req.user.role === "admin") {
        next();
      } else {
        res.status(401).send("Anda tidak diizinkan melakukan tindakan ini.");
      }
    } catch {
      console.log("sss");
      res.status(401).send("Token tidak valid.");
    }
  } else {
    res.status(401).send("Anda belum login.");
  }
}

export default authMiddleware;
