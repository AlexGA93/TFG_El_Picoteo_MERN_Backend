import { Router } from "express";
import multer, { StorageEngine } from "multer";
import * as stockController from "./stock.controller";

const router = Router();
const storage: StorageEngine = multer.diskStorage({
  destination: "public/images",
  filename: (_req, file, cb) => {
    const uniqueName = `${file.originalname}`;
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
