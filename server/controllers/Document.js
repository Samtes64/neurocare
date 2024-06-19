import Document from '../models/Documents.js';
import Therapist from '../models/Therapist.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import archiver from 'archiver';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
  destination: './public/Documents',
  filename: function (req, file, cb) {
    cb(null, 'document_' + Date.now() + path.extname(file.originalname).toLowerCase());
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 20 },
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /.*/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only document files are allowed.'));
    }
  },
}).single('document');

export const uploadDocument = (req, res,next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    try {
      const therapistId = req.user.id;
      const therapist = await Therapist.findOne({ user: therapistId });

      if (!therapist) {
        return res.status(404).json({ error: 'Therapist not found.' });
      }

      const newDocument = new Document({
        therapist: therapist._id,
        document: req.file.filename,
      });

      await newDocument.save();

      return res.status(201).json({
        message: 'Document uploaded successfully',
        document: newDocument,
      });
    } catch (error) {
      console.error('Error uploading document:', error);
      return res.status(500).json({ error: 'Failed to upload document.' });
    }
  });
};

export const getDocumentsByTherapist = async (req, res,next) => {
  try {
    const therapistId = req.user.id;
    const therapist = await Therapist.findOne({ user: therapistId });

    if (!therapist) {
      return res.status(404).json({ error: 'Therapist not found.' });
    }

    const documents = await Document.find({ therapist: therapist._id });

    return res.status(200).json(documents);
  } catch (error) {
    console.error('Error retrieving documents:', error);
    return res.status(500).json({ error: 'Failed to retrieve documents.' });
  }
};

export const getDocumentsById = async (req, res,next) => {
  try {
    const therapistId = req.params.therapistId;
    const therapist = await Therapist.findById(therapistId);

    if (!therapist) {
      return res.status(404).json({ error: 'Therapist not found.' });
    }

    const documents = await Document.find({ therapist: therapist._id });

    return res.status(200).json(documents);
  } catch (error) {
    console.error('Error retrieving documents:', error);
    return res.status(500).json({ error: 'Failed to retrieve documents.' });
  }
};

export const downloadDocuments = async (req, res,next) => {
  try {
    const therapistId = req.params.therapistId;
    const therapist = await Therapist.findById(therapistId);

    if (!therapist) {
      return res.status(404).json({ error: 'Therapist not found.' });
    }

    const documents = await Document.find({ therapist: therapist._id });

    if (documents.length === 0) {
      return res.status(404).json({ error: 'No documents found for this therapist.' });
    }

    const zip = archiver('zip');
    res.attachment(`documents_${therapistId}.zip`);

    zip.pipe(res);

    for (const document of documents) {
      const filePath = path.join(__dirname, '..', 'public', 'Documents', document.document);
      const fileExists = fs.existsSync(filePath);

      if (fileExists) {
        zip.file(filePath, { name: document.document });
      }
    }

    zip.finalize();
  } catch (error) {
    console.error('Error downloading documents:', error);
    return res.status(500).json({ error: 'Failed to download documents.' });
  }
};

export const deleteDocument = async (req, res,next) => {
  try {
    const userId = req.user.id;
    const documentId = req.params.documentId;
    const therapist = await Therapist.findOne({ user: userId });

    if (!therapist) {
      return res.status(404).json({ error: 'Therapist not found.' });
    }

    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({ error: 'Document not found.' });
    }

    if (document.therapist.toString() !== therapist._id.toString()) {
      return res.status(403).json({ error: "Unauthorized: You don't have permission to delete this document." });
    }

    const documentPath = path.join(__dirname, '..', 'public', 'Documents', document.document);
    fs.unlinkSync(documentPath);

    await Document.findByIdAndDelete(documentId);

    return res.status(200).json({ message: 'Document deleted successfully.' });
  } catch (error) {
    console.error('Error deleting document:', error);
    return res.status(500).json({ error: 'Failed to delete document.' });
  }
};

export const hasDocument = async (req, res,next) => {
  try {
    const therapistId = req.params.therapistId;
    const therapist = await Therapist.findById(therapistId);

    if (!therapist) {
      return res.status(404).json({ error: 'Therapist not found.' });
    }

    const hasDocument = await Document.findOne({ therapist: therapist._id });

    res.json({ hasDocument: !!hasDocument });
  } catch (error) {
    console.error('Error checking document:', error);
    return res.status(500).json({ error: 'Failed to check document.' });
  }
};


export const downloadTherapistDocuments = async (req, res) => {
  try {
    const therapistId = req.params.therapistId;

    // Find the therapist by ID
    const therapist = await Therapist.findById(therapistId);

    if (!therapist) {
      return res.status(404).json({ error: 'Therapist not found.' });
    }

    // Find documents associated with the therapist
    const documents = await Document.find({ therapist: therapist._id });

    if (documents.length === 0) {
      return res.status(404).json({ error: 'No documents found for this therapist.' });
    }

    // Create a ZIP archive and prepare it for download
    const zip = archiver('zip');
    res.attachment(`therapist_${therapistId}_documents.zip`);

    zip.pipe(res);

    // Add each document file to the ZIP archive
    for (const document of documents) {
      const filePath = path.join(__dirname, '..', 'public', 'Documents', document.document);
      const fileExists = fs.existsSync(filePath);

      if (fileExists) {
        zip.file(filePath, { name: document.document });
      }
    }

    zip.finalize();
  } catch (error) {
    console.error('Error downloading therapist documents:', error);
    return res.status(500).json({ error: 'Failed to download therapist documents.' });
  }
};