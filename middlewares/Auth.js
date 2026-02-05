import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userauth = (req, res, next) => {
    try {
        const bearerT = req.headers["authorization"];
       

        if (typeof bearerT !== "undefined") {
            let token = bearerT.split(" ")[1];
        

            let user = jwt.verify(token, process.env.SECRETKEY);

            
            req.token = user;

            next();
        } 
        else {
            return res.status(401).json({ message: "token not set" });
        }
    }
    catch (err) {
        return res.status(401).json({ message: "invalid or expire token" });
    }
};

export default userauth;
