import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true  
    } ,
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    catergory:{
        type:String,
        required:true
    }

},{timestamp:true})

const itemModel = mongoose.model('Item',itemSchema);

export default itemModel;