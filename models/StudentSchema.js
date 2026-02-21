import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String
    },
    image: {
        type: String
    },
    city: {
        type: String
    }
}, { timestamps: true });

const StudentModel = mongoose.model("students", StudentSchema);

export default StudentModel;