import express from 'express';
import { accessChat, addToGroup, createGroup, fetchChat, removeGroup, renameGroup } from '../controllers/ChatController.js';
import authMiddleWare from '../MiddleWare/authMiddleWare.js';

const router = express.Router();

router.route('/').post(authMiddleWare, accessChat);
router.route('/').get(authMiddleWare, fetchChat);
router.route('/group').post(authMiddleWare, createGroup);
router.route('/rename').put(authMiddleWare, renameGroup);
router.route('/groupadd').put(authMiddleWare, addToGroup);
router.route('/groupremove').put(authMiddleWare, removeGroup);

export default router;
