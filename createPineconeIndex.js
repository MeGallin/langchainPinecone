// Create the index in Pinecone

export const createPineconeIndex = async (
  client,
  indexName,
  vectorDimension,
) => {
  try {
    // Retrieve the list of existing indexes
    const existingIndexes = [client.listIndexes()];

    // Check if the index already exists
    if (!existingIndexes.includes(indexName)) {
      // Create a new index if it does not exist
      const createClient = await client.createIndex({
        name: indexName,
        dimension: vectorDimension,
        metric: 'cosine',
        spec: {
          serverless: {
            cloud: 'aws',
            region: 'us-east-1',
          },
        },
      });

      console.log(`${createClient.name} was successfully created`);
    } else {
      console.log(`${createClient.name} index already exists`);
    }
  } catch (error) {
    console.error(`Error creating index: ${error}`);
  }
};
