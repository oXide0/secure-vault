import { SNSEvent } from 'aws-lambda';

const WEBHOOK_URL =
    'https://discord.com/api/webhooks/1291391000790433852/MIAbxf2m0Ga4IgfSRv-Bnb1mGPFQX1xno_mnhIb8JvBB7qUDIT8mRjq_o--RA0C9PpfU';

async function handler(event: SNSEvent, context?: any) {
    for (const record of event.Records) {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            body: JSON.stringify({
                content: record.Sns.Message,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(await response.text());
    }
}

export { handler };
