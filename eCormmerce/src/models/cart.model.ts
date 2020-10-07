import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        products: [
          {
            productId:{
                type:String,
                required:true
            } ,
            quantity: {
                type:Number,
                required:true
            },
            name: {
                type:String,
                required:true
            },
            price: {
                type:Number,
                required:true
            }
          }
        ],
    },
{timestamp:true}
)

const cartModel = mongoose.model('Cart',cartSchema);

export default cartModel;