import mongoose from "mongoose";

let StudentSchema = mongoose.Schema({
    name:String,
    age:Number,
    email:{
        type : String,
        require : true,
        unique : true

    },
    phone:String,
    Image :String,
    city:String
});


//mongodb model

let StudentModel = mongoose.model('students',StudentSchema);

export default StudentModel;