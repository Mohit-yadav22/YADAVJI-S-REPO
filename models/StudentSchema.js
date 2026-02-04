import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

let StudentSchema = mongoose.Schema({
    _id:Number,
    name:String,
    age:Number,
    email:{
        type : String,
        require : true,
        unique : true

    },
    phone:String,
    city:String
});


//mongodb model

let StudentModel = mongoose.model('students',StudentSchema);

export default StudentModel;