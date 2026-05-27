import { Router } from "express";
import multer, { StorageEngine } from "multer";
import * as stockController from "./stock.controller";
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
                                                                                            
router.get("/", stockController.getAll);
router.get("/:id", stockController.getById);
router.post("/",upload.single("imagen"), stockController.create);
router.put("/:id", upload.single("imagen"),stockController.update);
router.delete("/:id", stockController.remove);

export default router;
