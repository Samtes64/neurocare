import express from 'express';
import { verifyToken } from "../middleware/verifyToken.js";
import {
  uploadDocument,
  getDocumentsByTherapist,
  getDocumentsById,
  downloadDocuments,
  deleteDocument,
  hasDocument,
} from '../controllers/Document.js';

const router = express.Router();

router.post('/upload', verifyToken, uploadDocument);
router.get('/self', verifyToken, getDocumentsByTherapist);
router.get('/byId/:therapistId', verifyToken, getDocumentsById);
router.get('/download/:therapistId', verifyToken, downloadDocuments);
router.delete('/:documentId', verifyToken, deleteDocument);
router.get('/hasDocument/:therapistId', verifyToken, hasDocument);

export default router;
