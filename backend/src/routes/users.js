const { Router } = require("express");
const { createUsersController } = require("../controllers/users");
const { requireRole } = require("../middleware/auth");

// Mounted at /professores and /alunos; only teachers can manage either list.
function createUsersRouter(role) {
  const router = Router();
  const controller = createUsersController(role);

  router.use(requireRole("professor"));
  router.get("/", controller.list);
  router.get("/:id", controller.get);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.remove);

  return router;
}

module.exports = createUsersRouter;
