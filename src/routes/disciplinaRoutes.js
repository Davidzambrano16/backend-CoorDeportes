import { Router } from "express";
import { obtenerDisciplinas } from "../controllers/index.js";

const router = Router()

router.get('/', obtenerDisciplinas)

export default router