import express from 'express';
import { getAllUsers, userCreate, userLogin } from '../controllers/user-controller';

const router = express.Router()

router.get("/", getAllUsers);
router.post("/signup", userCreate);
router.post("/login", userLogin);

export default router;