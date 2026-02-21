import express from 'express';
import {
  getData,
  getInserData,
  getUpdateData,
  getDeleteData,
  getReadData,
  getOneData
} from '../controller/CRUDcontroller.js';
import StudentModel from '../models/StudentSchema.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs'



const router = express.Router();

const storage = multer.diskStorage({
  destination:(req,file,callback)=>{
    callback(null,'./uploads')
  },
  filename:(req,file,callback)=>{
    let filename = Date.now() + path.extname(file.originalname)
    callback(null,filename)
  }
})

const filefilter = (req , file , callback)=>
{
  if(file.mimetype.startsWith('image/')){
    callback(null,true)

  }else if(file.mimetype.startsWith('application/pdf')){
    callback(null,true)
  }
  else{
    callback('only images are allowed',false)
  }
}

const upload = multer({
  storage:storage,
  fileFilter:filefilter,
  limits:(1024*1024*50)
})


// READ ALL
router.get('/get-students', getData);

router.get('/:id',  getOneData);

// CREATE
router.post('/add-data',upload.single('images'), getInserData);

// UPDATE
router.put('/update-data/:id', getUpdateData);

// DELETE
router.delete('/delete-data/:id', getDeleteData);

// READ ONE
router.get('/read-data/:id', getReadData);

//PAGINATION
router.get('/',async(req,res)=>{
 

  try{
   
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit)

  let skip = (page-1) * limit;
   let totalDocument = await StudentModel.countDocuments()

   let data = await StudentModel.find().skip(skip).limit(Number(limit));

   res.status(200).json({
    totalDocument:totalDocument,
    totalPages:Math.ceil(totalDocument/limit),
    currentPage : Number(page),
    limit : Number(limit),
    data
   })
  }catch(err){
  res.json({message : err.message})
  }

})

export default router;
