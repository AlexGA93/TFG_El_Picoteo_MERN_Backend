import { Router } from "express";
import * as stockController from "./recipes.controller";
import multer, { StorageEngine } from "multer";

const router = Router();
const storage: StorageEngine = multer.diskStorage({
  destination: "public/images",
  filename: (_req, file, cb) => {
    const uniqueName = `${file.originalname}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });

// GET /api/databases/recipes
router.get("/", stockController.getAll);
// GET /api/databases/recipes/:id
router.get("/:id", stockController.getById);
// POST /api/databases/recipes
router.post("/", upload.single("imagen"),stockController.create);
// PUT /api/databases/recipes/:id
router.put("/:id", upload.single("imagen"),stockController.update);
// DELETE /api/databases/recipes/:id
router.delete("/:id", stockController.remove);

export default router;