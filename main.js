import express from 'express';
import bodyParser from 'body-parser';
import { Pinecone } from '@pinecone-database/pinecone';
import * as dotenv from 'dotenv';
import cors from 'cors';
import queryRoute from './routes/queryRoute.js';
import upsertRoute from './routes/upsertRoute.js';

dotenv.config();

// Create Express app
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

const indexName = process.env.PINECONE_ENVIRONMENT;
const vectorDimension = 1536;

const client = new Pinecone();
client.index({
  apiKey: process.env.PINECONE_API_KEY,
});

// Make the Pinecone client available to the route handlers
app.locals.pineconeClient = client;

// Use the routes
app.use('/', queryRoute);
app.use('/', upsertRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
