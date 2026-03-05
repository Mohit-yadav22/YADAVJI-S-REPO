import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectionDB } from "./config/database.js";
import router from "./routers/crudrouter.js";
import userRoutes from "./routers/userrouter.js";
import userauth from "./middlewares/Auth.js";

dotenv.config();

connectionDB();

const app = express();

app.use(cors({
 origin: "http://localhost:5173",
 credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
 res.send("Server running");
});

app.use("/user", userRoutes);
app.use("/student", userauth, router);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
 console.log(`Server running on port ${PORT}`);
});