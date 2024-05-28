import { OpenAIEmbeddings } from '@langchain/openai';
import { OpenAI } from '@langchain/openai';
import { loadQAStuffChain } from 'langchain/chains';
import { Document } from 'langchain/document';

export const queryPineconeIndex = async (client, indexName, question) => {
  console.log(`Running query`);
  const index = client.Index(indexName);

  const apiKey = process.env.OPEN_AI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set in the environment variables.');
  }

  const llm = new OpenAI(
    {
      apiKey: apiKey,
    },
    {
      temperature: 0,
      model: 'gpt-3.5-turbo',
    },
  );

  // Initalise Embeddings
  const openAIEmbeddings = new OpenAIEmbeddings({
    apiKey: apiKey,
  });

  const queryEmbeddings = await openAIEmbeddings.embedQuery(question);

  let queryResponse = await index.query({
    topK: 10,
    vector: queryEmbeddings,
    includeMetadata: true,
    includeValues: true,
  });

  if (queryResponse.matches.length) {
    const chain = loadQAStuffChain(llm);

    const concatenatedPageContent = queryResponse.matches
      .map((match) => match.metadata.pageContent)
      .join(' ');

    return await chain.call({
      input_documents: [new Document({ pageContent: concatenatedPageContent })],
      question,
    });
  } else {
    console.log(`No query matches!! Please re-phase the question`);
  }
};
