import { OpenAIEmbeddings } from '@langchain/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { v4 as uuidv4 } from 'uuid';

const createEmbeddings = async (text, apiKey, batchSize) => {
  try {
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 2000,
    });
    const chunks = await textSplitter.createDocuments([text]);
    const embeddings = new OpenAIEmbeddings({ apiKey, batchSize });
    const embeddingsArrays = await embeddings.embedDocuments(
      chunks.map((chunk) => chunk.pageContent.replace(/\n/g, '')),
    );
    return { chunks, embeddingsArrays };
  } catch (error) {
    console.error('Failed to create embeddings:', error);
    throw error; // Re-throw the error after logging it
  }
};

export const updatePineconeIndex = async (client, indexName, docs, apiKey) => {
  const index = client.Index(indexName);

  for (const doc of docs) {
    try {
      console.log(`Processing document: ${doc.metadata.source}`);
      const { chunks, embeddingsArrays } = await createEmbeddings(
        doc.pageContent,
        apiKey,
        512,
      );

      const batch = chunks.map((chunk, idx) => ({
        id: uuidv4(),
        values: embeddingsArrays[idx],
        metadata: {
          ...chunk.metadata,
          loc: JSON.stringify(chunk.metadata.loc),
          pageContent: chunk.pageContent,
          textPath: doc.metadata.source,
        },
      }));

      // Upert into vector database
      await index.upsert(batch);
    } catch (error) {
      console.error(`Error processing document ${doc.metadata.source}:`, error);
    }
  }
};
