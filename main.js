import { Pinecone } from '@pinecone-database/pinecone';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

import * as dotenv from 'dotenv';

dotenv.config();

const loader = new DirectoryLoader('./documents', {
  '.pdf': (path) => new PDFLoader(path),
});

const docs = await loader.load('./documents');

console.log(docs);

const question = 'How does the ABS work ?';
const indexName = process.env.PINECONE_ENVIRONMENT;
const vectorDimension = 1536;
