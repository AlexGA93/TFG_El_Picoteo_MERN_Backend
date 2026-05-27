import { Router } from "express";
import * as stockController from "./recipes.controller";
import multer, { StorageEngine } from "multer";
import path from "path";

const router = Router();
const storage: StorageEngine = multer.diskStorage({
  destination: "public/images",
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);
    const baseName = path
      .basename(file.originalname, extension)
      .replace(/[^a-zA-Z0-9_-]/g, "-");
    const uniqueName = `${Date.now()}-${baseName}${extension}`;
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
