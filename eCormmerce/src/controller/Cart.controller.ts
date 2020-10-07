import {Router,Request,Response} from 'express';
import cartModel from '../models/cart.model';
import {authMiddleware} from '../middleware/authentication.middleware';
import {validationResult} from 'express-validator';
import {bodyValidation} from '../middleware/bodyValidation.middleware';

class AddToCartController{
    public router = Router();
    public cartItem = cartModel;

    constructor(){
        this.initializeRouter();
    }


    public initializeRouter(){
        this.router.put('/add-to-cart',authMiddleware,bodyValidation('checkAddCartItem'),this.addCart)
    }

    addCart = async(req:Request,res:Response) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});
        const {userId,productId,quantity,name,price} = req.body;
        try {

            let cart = await this.cartItem.findOne({userId:req.body.userId});
            if(cart){
                let itemIndex = cart.products.findIndex(product=>product.productId == productId );
                if(itemIndex > -1){
                    let productItem = cart.products[itemIndex];
                    productItem.quantity = quantity;
                    cart.products[itemIndex] = productItem;
                }else{
                    cart.products.push({productId,quantity,name,price})
                }
                cart = await cart.save();
                return res.status(201).send(cart);
            }else{
                const newCart = new this.cartItem({
                    userId,
                    products: [{ productId, quantity, name, price }]
                  });
                  await newCart.save();
                  return res.status(201).send(newCart);
            }
           
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error')
        }
    }
}

export default AddToCartController;
