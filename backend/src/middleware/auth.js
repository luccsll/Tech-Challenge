const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "a3f9c1e7b2d4508f6a1c9e3d7b0f2a48";

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Token não informado." });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
}

module.exports = { requireAuth, JWT_SECRET };
