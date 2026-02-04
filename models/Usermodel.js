import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    user_password: {
        type: String,
        required: true

    },
    createAt:{
        type: Date,
        default: Date.now
    }

});

let UserModel = mongoose.model('users',userSchema);

export default UserModel;
