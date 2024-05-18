import { Pinecone } from '@pinecone-database/pinecone';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import * as dotenv from 'dotenv';
import { createPineconeIndex } from './createPineconeIndex.js';
import { updatePineconeIndex } from './updatePineconeIndex.js';
import { queryPineconeIndex } from './queryPineconeIndex.js';

dotenv.config();

const loader = new DirectoryLoader('./documents', {
  '.pdf': (path) => new PDFLoader(path),
});

const docs = await loader.load('./documents');

const question =
  'Can you provide me with step by step instructions on how to reset the type pressure warning ?';
const indexName = process.env.PINECONE_ENVIRONMENT;
const vectorDimension = 1536;

const client = new Pinecone();

client.index({
  apiKey: process.env.PINECONE_API_KEY,
});

(async () => {
  // await createPineconeIndex(client, indexName, vectorDimension);
  // await updatePineconeIndex(client, indexName, docs);
  await queryPineconeIndex(client, indexName, question);
})();
