import express from 'express';
import bodyParser from 'body-parser';
import { Pinecone } from '@pinecone-database/pinecone';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { DocxLoader } from '@langchain/community/document_loaders/fs/docx';
import * as dotenv from 'dotenv';
import cors from 'cors';
import queryRoute from './routes/queryRoute.js';

dotenv.config();

// Create Express app
const app = express();
app.use(cors());
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

// Make the Pinecone client available to the route handlers
app.locals.pineconeClient = client;

(async () => {
  // await createPineconeIndex(client, indexName, vectorDimension);
  // await updatePineconeIndex(client, indexName, docs);
})();

// Use the routes
app.use('/', queryRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
