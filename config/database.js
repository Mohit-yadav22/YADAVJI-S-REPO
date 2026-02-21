import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
let dburl = process.env.DATABASE_URL;

const connectionDB = ()=>{
    mongoose.connect(dburl).then(()=>console.log(`database connected succesfully`)
).catch((err)=>console.log('not connected',err)
);
}

mongoose.connection.once("open", () => {
    console.log("Connected DB:", mongoose.connection.name);
});

export { connectionDB };



