import express from 'express';
import bodyParser from 'body-parser';
import { Pinecone } from '@pinecone-database/pinecone';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { DocxLoader } from '@langchain/community/document_loaders/fs/docx';
import * as dotenv from 'dotenv';
import { createPineconeIndex } from './createPineconeIndex.js';
import { updatePineconeIndex } from './updatePineconeIndex.js';
import { queryPineconeIndex } from './queryPineconeIndex.js';

dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

const loader = new DirectoryLoader('./documents', {
  '.pdf': (path) => new PDFLoader(path),
  '.docx': (path) => new DocxLoader(path),
});

const docs = await loader.load();

const indexName = process.env.PINECONE_ENVIRONMENT;
const vectorDimension = 1536;

const client = new Pinecone();
client.index({
  apiKey: process.env.PINECONE_API_KEY,
});

(async () => {
  // await createPineconeIndex(client, indexName, vectorDimension);
  // await updatePineconeIndex(client, indexName, docs);
})();

// Define the POST endpoint
app.post('/query', async (req, res) => {
  const { question } = req.body;

  if (!indexName || !question)
    return res
      .status(400)
      .json({ error: 'indexName and question are required' });

  try {
    const result = await queryPineconeIndex(client, indexName, question);

    res.json({ question, answer: result.text });
  } catch (error) {
    console.error('Error querying Pinecone vector store:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
