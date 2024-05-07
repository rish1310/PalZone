import express from 'express';
import { getUser, getUserFriends, addRemoveFriend, viewProfile, searchUsers } from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

//GET
router.get('/search', searchUsers);
router.get("/:id", verifyToken, getUser, viewProfile);
router.get("/:id/friends", verifyToken, getUserFriends);

//UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;