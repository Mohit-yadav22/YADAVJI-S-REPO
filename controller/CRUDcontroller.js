import StudentModel from "../models/StudentSchema.js";

// READ ALL
export const getData = async (req, res) => {
  try {
    const allData = await StudentModel.find();
    res.status(200).json(allData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 
export const getOneData = async (req, res) => {
  try {
    const allData = await StudentModel.findById(req.params.id);
    res.status(200).json(allData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE
export const getInserData = async (req, res) => {
  try {
    const data = await StudentModel.create(req.body);
    res.status(201).json({
      message: "Data saved successfully",
      data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const getUpdateData = async (req, res) => {
  try {
    await StudentModel.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json({ message: "Data updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const getDeleteData = async (req, res) => {
  try {
    await StudentModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
export const getReadData = async (req, res) => {
  try {
    const data = await StudentModel.findById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
