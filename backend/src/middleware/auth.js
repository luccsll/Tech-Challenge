const jwt = require("jsonwebtoken");
const { users } = require("../data/store");

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

// Checks the role of the stored user, so a deleted account loses access right away.
function requireRole(role) {
  return (req, res, next) => {
    requireAuth(req, res, () => {
      const user = users.find((u) => u.id === req.user.sub);
      if (!user) {
        return res.status(401).json({ message: "Token inválido ou expirado." });
      }
      if (user.role !== role) {
        return res.status(403).json({ message: "Você não tem permissão para esta ação." });
      }
      next();
    });
  };
}

module.exports = { requireAuth, requireRole, JWT_SECRET };
