import { PutObjectCommand, S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import output from '../../../shared/output.json';

export const uploadFile = async (file: File): Promise<string> => {
    const region = 'eu-north-1';

    const s3Client = new S3Client({
        region,
        credentials: {
            accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
            secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
        },
    });
    const command = new PutObjectCommand({
        Bucket: output['SecureVault-DataStack'].FilesBucketName,
        Key: file.name,
        Body: file,
    });

    await s3Client.send(command);
    return `https://${command.input.Bucket}.s3.${region}.amazonaws.com/${command.input.Key}`;
};

export const listFiles = async (): Promise<string[]> => {
    const s3Client = new S3Client({
        region: import.meta.env.VITE_AWS_REGION,
        credentials: {
            accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
            secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
        },
    });

    const command = new ListObjectsV2Command({
        Bucket: output['SecureVault-DataStack'].FilesBucketName,
    });

    const { Contents } = await s3Client.send(command);

    if (!Contents) return [];

    return Contents.map((item) => item.Key || '');
};
