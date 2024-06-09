// Update the pinecone Index
import { OpenAIEmbeddings } from '@langchain/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { v4 as uuidv4 } from 'uuid';

export const updatePineconeIndex = async (client, indexName, docs) => {
  const index = client.Index(indexName);

  // Loop through the docs

  for (const doc of docs) {
    console.log(`Processing documents: ${doc.metadata.source}`);

    const textPath = doc.metadata.source;
    const text = doc.pageContent;
    const textSplitter = new RecursiveCharacterTextSplitter({
      chuckSize: 1000,
    });

    console.log(`Splitting document into chunks`);

    const chunks = await textSplitter.createDocuments([text]);
    const batchSize = 512;

    console.log(`Chunks = ${chunks}, sizes`);

    const embeddingsArrays = await new OpenAIEmbeddings({
      apiKey: process.env.OPEN_AI_API_KEY,
      batchSize: batchSize,
    }).embedDocuments(
      chunks.map((chunk) => chunk.pageContent.replace(/\n/g, '')),
    );

    let batch = [];
    for (let idx = 0; idx < chunks.length; idx++) {
      const chunk = chunks[idx];
      const vector = {
        id: `${uuidv4()}`,
        values: embeddingsArrays[idx],
        metadata: {
          ...chunk.metadata,
          loc: JSON.stringify(chunk.metadata.loc),
          pageContent: chunk.pageContent,
          textPath: textPath,
        },
      };

      batch.push(vector);

      console.log(batch);

      //Might want to do some checks
      await index.upsert(batch);
    }
    console.log(`Pinecone has been updated with ${chunks.length}`);
  }
};
