import express from "express";
import {
  getData,
  getInserData,
  getUpdateData,
  getDeleteData,
  getReadData,
  getOneData,
} from "../controller/CRUDcontroller.js";

import StudentModel from "../models/StudentSchema.js";
import multer from "multer";
import path from "path";

const router = express.Router();


// ================= MULTER STORAGE =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },

  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});


// ================= FILE FILTER =================
const fileFilter = (req, file, cb) => {

  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } 
  else if (file.mimetype === "application/pdf") {
    cb(null, true);
  } 
  else {
    cb(new Error("Only images or PDF allowed"), false);
  }

};


// ================= MULTER CONFIG =================
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 50 } // 50MB
});


// ================= ROUTES =================


// GET ALL STUDENTS
router.get("/get-students", getData);


// PAGINATION
router.get("/", async (req, res) => {

  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const totalDocument = await StudentModel.countDocuments();

    const data = await StudentModel.find()
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      totalDocument,
      totalPages: Math.ceil(totalDocument / limit),
      currentPage: page,
      limit,
      data
    });

  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }

});


// GET SINGLE DATA
router.get("/read-data/:id", getReadData);


// GET ONE (ALTERNATIVE)
router.get("/:id", getOneData);


// INSERT DATA
router.post("/add-data", upload.single("images"), getInserData);


// UPDATE DATA
router.put("/update-data/:id", getUpdateData);


// DELETE DATA
router.delete("/delete-data/:id", getDeleteData);


export default router;