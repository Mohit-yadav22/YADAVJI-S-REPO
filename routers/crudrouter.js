import express from 'express';
import {
  getData,
  getInserData,
  getUpdateData,
  getDeleteData,
  getReadData,
  getOneData
} from '../controller/CRUDcontroller.js';

const router = express.Router();

// READ ALL
router.get('/', getData);

router.get('/:id',  getOneData);

// CREATE
router.post('/add-data', getInserData);

// UPDATE
router.put('/update-data/:id', getUpdateData);

// DELETE
router.delete('/delete-data/:id', getDeleteData);

// READ ONE
router.get('/read-data/:id', getReadData);

export default router;
