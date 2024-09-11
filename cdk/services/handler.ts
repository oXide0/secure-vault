import {
    DynamoDBClient,
    PutItemCommand,
    ScanCommand,
    UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { randomUUID } from 'crypto';
import { addCorsHeaders } from '../helpers';

export async function handler(
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> {
    const dbClient = new DynamoDBClient({});
    let response: APIGatewayProxyResult = {
        statusCode: 400,
        body: 'Invalid request',
    };

    if (event.httpMethod === 'GET') {
        response = await getFiles(dbClient);
    }

    if (event.httpMethod === 'POST') {
        const file = JSON.parse(event.body || '');
        file.id = randomUUID();
        file.starred = false;
        response = await putFile(dbClient, file);
    }

    if (event.httpMethod === 'PATCH') {
        const { fileId, starred } = JSON.parse(event.body || '');
        response = await updateFile(dbClient, fileId, starred);
    }

    return addCorsHeaders(response, 'http://localhost:5173');
}

const getFiles = async (dbClient: DynamoDBClient) => {
    const data = await dbClient.send(
        new ScanCommand({
            TableName: process.env.FILES_TABLE,
        })
    );
    const unmashalledItems = data.Items?.map((item) => unmarshall(item));

    return {
        statusCode: 201,
        body: JSON.stringify(unmashalledItems),
    };
};

const putFile = async (dbClient: DynamoDBClient, file: any) => {
    const data = await dbClient.send(
        new PutItemCommand({
            TableName: process.env.FILES_TABLE,
            Item: marshall(file),
        })
    );

    return {
        statusCode: 201,
        body: JSON.stringify(data),
    };
};

const updateFile = async (dbClient: DynamoDBClient, fileId: string, starred: boolean) => {
    const data = await dbClient.send(
        new UpdateItemCommand({
            TableName: process.env.FILES_TABLE,
            Key: { id: { S: fileId } },
            UpdateExpression: 'SET starred = :starred',
            ExpressionAttributeValues: {
                ':starred': { BOOL: starred },
            },
        })
    );

    return {
        statusCode: 201,
        body: JSON.stringify(data),
    };
};
