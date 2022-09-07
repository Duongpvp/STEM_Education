import express from 'express';
import { getUser, updateUser, deleteUser, followUser, unFollowUser, getAllUser, searchUser } from '../controllers/UserController.js';
import authMiddleWare from '../MiddleWare/authMiddleWare.js';

const router = express.Router();

router.get('/:id', getUser);
router.get('/', getAllUser);
router.get('/search/find',authMiddleWare, searchUser);
router.put('/:id', authMiddleWare, updateUser);
router.delete('/:id', authMiddleWare, deleteUser);
router.put('/:id/follow', authMiddleWare, followUser);
router.put('/:id/unfollow', authMiddleWare, unFollowUser);

export default router;