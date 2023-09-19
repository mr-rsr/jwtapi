import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';
import e from 'express';

export default {
    checkUserAuth: async (req, res, next) => {
        let token;
        const { authorization } = req.headers;
        if (authorization && authorization.startsWith("Bearer")) {
            token = authorization.split(" ")[1];
            try {
                const { id } = jwt.verify(token, process.env.JWT_TOKEN_KEY);
                console.log(id);

                req.user = await UserModel.findById(id).select("-password");
                next();
            } catch (err) {
                res.status(401).json({ message: "Unauthorized User" });
            }

        } else {
            res.status(401).json({ message: "No token" });

        }

    },
    
}
// UserModel.findById(userId).then((user)=>{
//     req.user=user;
//     next();
// }).catch((err)=>{
//     res.status(401).json({message:"Unauthorized"});
// })