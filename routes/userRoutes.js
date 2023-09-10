import express from 'express';
const router= express.Router();

import registerController from '../controllers/userController.js';

router.post('/register',registerController.userRegistration);

export default router;