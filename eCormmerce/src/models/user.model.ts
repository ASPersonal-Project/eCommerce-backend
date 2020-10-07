import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        reuired:true
    },
    password: {
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
});

const userModel = mongoose.model('User',userSchema);

export default userModel;