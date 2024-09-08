import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export async function handler(
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> {
    const dbClient = new DynamoDBClient({});

    if (event.httpMethod === 'GET') {
        const response = await getFiles(dbClient);
        return response;
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello, World!',
        }),
    };
}

const getFiles = async (dbClient: DynamoDBClient) => {
    const data = await dbClient.send(
        new ScanCommand({
            TableName: process.env.FILES_TABLE,
        })
    );
    const unmashalledItems = data.Items?.map((item) => unmarshall(item));
    console.log(unmashalledItems);

    return {
        statusCode: 201,
        body: JSON.stringify(unmashalledItems),
    };
};
