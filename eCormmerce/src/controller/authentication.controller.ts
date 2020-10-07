import {Router,Request,Response} from 'express';
import userModel from '../models/user.model';
import User from '../interface/user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {validationResult} from 'express-validator';
import {bodyValidation} from '../middleware/bodyValidation.middleware';
import dotenv from 'dotenv';
dotenv.config()


class AuthenticationController{
    private router = Router();
    private user = userModel;

    constructor(){
        this.intializeRouter();
    }

    private intializeRouter(){
        this.router.post('/signup',bodyValidation('signupUser'),this.signUp);
        this.router.post('/login',bodyValidation('signinUser'),this.signIn)
    }

    private signUp = async(req:Request,res:Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});
        const userData: User = req.body;
        try {
            const exitUser: User = await this.user.findOne({email:userData.email});
            if(exitUser){
                res.status(400).json({msg:"User already exist"});
            }
            const hashedPassword = await bcrypt.hash(userData.password,10);

            const newUser = new this.user({
                ...userData,
                password:hashedPassword
            });

            await newUser.save();
            const token: string = this.createToken(newUser);
            res.status(200).json(token);
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }

    private signIn = async (req:Request,res:Response) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});
        const userData:User = req.body;

        try {
            const exituser: User = await this.user.findOne({email:userData.email});
       
            if(exituser){
                const isMatch:boolean = await bcrypt.compare(userData?.password,exituser?.password);
               
                if(!isMatch){
                    res.status(400).json({msg:'Your password is wrong'});
                }
                const token:string = this.createToken(exituser);
                res.status(200).json(token);
            }else{
                res.status(400).json({msg:'Please register first'})
            }
    
           
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }

       
    }


    private createToken = (user:User):string => {
        
        const expiresIn = 60*60;
        const payload = {
            user:{
                id:user.id,
                email:user.email
            }
            
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn});
    
        return token;
    }
}

export default AuthenticationController;