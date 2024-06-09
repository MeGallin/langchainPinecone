import express from 'express';
import { updatePineconeIndex } from '../controllers/updatePineconeIndex.js';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { DocxLoader } from '@langchain/community/document_loaders/fs/docx';

const router = express.Router();

router.post('/upsert', async (req, res) => {
  const client = req.app.locals.pineconeClient;
  const indexName = process.env.PINECONE_ENVIRONMENT;

  const loader = new DirectoryLoader('./documents', {
    '.pdf': (path) => new PDFLoader(path),
    '.docx': (path) => new DocxLoader(path),
  });

  try {
    const docs = await loader.load();
    await updatePineconeIndex(client, indexName, docs);
    res.status(200).send('Pinecone index updated successfully.');
  } catch (error) {
    res.status(500).send(`Error updating Pinecone index: ${error.message}`);
  }
});

export default router;
