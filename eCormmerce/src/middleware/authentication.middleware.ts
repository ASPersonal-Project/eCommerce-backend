import jwt from 'jsonwebtoken';
import {Request,Response,NextFunction} from 'express';



export const authMiddleware = (req:Request,res:Response,next:NextFunction) =>{
    const token:string = req.header('x-auth-token');

    if(!token){
        return res.json({msg:'No token,autherization denied'});
    }
    
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.json({msg: "Token is inValid"})
    }
}