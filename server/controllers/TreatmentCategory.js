import TreatmentCategory from '../models/TreatmentCategory.js';

// Get all treatment categories
export const getAllTreatmentCategories = async (req, res) => {
  try {
    const categories = await TreatmentCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching treatment categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new treatment category
export const createTreatmentCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const newCategory = new TreatmentCategory({ categoryName });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating treatment category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an existing treatment category
export const updateTreatmentCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;
    const updatedCategory = await TreatmentCategory.findByIdAndUpdate(
      id,
      { categoryName },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Treatment Category not found' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('Error updating treatment category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a treatment category
export const deleteTreatmentCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await TreatmentCategory.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Treatment Category not found' });
    }
    res.status(200).json({ message: 'Treatment Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting treatment category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
