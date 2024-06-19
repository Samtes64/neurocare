import express from 'express';
import {
  getAllTreatmentCategories,
  createTreatmentCategory,
  updateTreatmentCategory,
  deleteTreatmentCategory
} from '../controllers/TreatmentCategory.js';

const router = express.Router();

// Get all treatment categories
router.get('/', getAllTreatmentCategories);

// Create a new treatment category
router.post('/', createTreatmentCategory);

// Update an existing treatment category
router.put('/:id', updateTreatmentCategory);

// Delete a treatment category
router.delete('/:id', deleteTreatmentCategory);

export default router;
