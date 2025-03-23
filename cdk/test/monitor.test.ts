import { SNSEvent } from 'aws-lambda';
import { handler } from '../services/monitor/handler';

const snsEvent: SNSEvent = {
    Records: [
        {
            Sns: {
                Message: 'Hello, World!',
            },
        },
    ],
} as any;

handler(snsEvent, null);
