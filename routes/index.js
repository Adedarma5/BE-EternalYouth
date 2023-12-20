import  express  from "express";
import { getUsers, Register, Login, Logout } from "../controllers/users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshtoken.js"
import { getProducts, getOrder, postOrder, postTransaksi } from "../controllers/koneksi.js";
const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.delete('/logout', Logout);
router.get('/token', refreshToken);
router.get('/Products', getProducts);
router.get('/Order', getOrder);
router.post('/Order', postOrder);
router.post('/Transaksi', postTransaksi);

export default router;