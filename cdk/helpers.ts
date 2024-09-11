import { Fn, Stack } from 'aws-cdk-lib';
import { APIGatewayProxyResult } from 'aws-lambda';

export function getSuffixFromStack(stack: Stack): string {
    const shortStackId = Fn.select(2, Fn.split('/', stack.stackId));
    const suffix = Fn.select(4, Fn.split('-', shortStackId));
    return suffix;
}

export function getStackId(stackName: string): string {
    return `SecureVault-${stackName}`;
}

/**
 * Adds CORS headers to the API Gateway response.
 *
 * @param response The original API Gateway response.
 * @param origin The allowed origin for the CORS request (default: '*').
 * @returns The response object with CORS headers added.
 */
export function addCorsHeaders(
    response: APIGatewayProxyResult,
    origin: string = '*'
): APIGatewayProxyResult {
    response.headers = {
        ...response.headers,
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    };

    return response;
}
