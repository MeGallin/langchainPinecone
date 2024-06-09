import express from 'express';
import { queryPineconeIndex } from '../controllers/queryPineconeIndex.js';

const router = express.Router();

router.post('/query', async (req, res) => {
  const { question } = req.body;
  const indexName = process.env.PINECONE_ENVIRONMENT;
  const client = req.app.locals.pineconeClient;

  if (!indexName || !question) {
    return res
      .status(400)
      .json({ error: 'indexName and question are required' });
  }

  try {
    const result = await queryPineconeIndex(client, indexName, question);
    res.json({ question, answer: result.text });
  } catch (error) {
    console.error('Error querying Pinecone vector store:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
