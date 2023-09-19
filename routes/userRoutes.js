import express from 'express';
const router= express.Router();
import checkUserAuth from '../middleware/authMiddleWare.js';
import userOnboarding from '../controllers/userController.js';

// route level middleware
router.use('/changepassword',checkUserAuth.checkUserAuth);
router.use('/profile',checkUserAuth.checkUserAuth);   

// public routes
router.post('/register',userOnboarding.userRegistration);
router.post('/login',userOnboarding.userLogin);
router.post('/forgotpassword',userOnboarding.forgotPassword);
// private routes
router.post('/changepassword',userOnboarding.changePassword);
router.get('/profile',userOnboarding.userProfile);
router.put('/profile/password',userOnboarding.resetPassword);

export default router;