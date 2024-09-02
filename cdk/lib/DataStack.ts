import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { HttpMethods, IBucket, ObjectOwnership, Bucket as S3Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { getSuffixFromStack } from '../helpers';

export class DataStack extends Stack {
    public readonly filesBucket: IBucket;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.filesBucket = new S3Bucket(this, 'FilesBucket', {
            bucketName: `secure-vault-files-${getSuffixFromStack(this)}`,
            cors: [
                {
                    allowedMethods: [
                        HttpMethods.GET,
                        HttpMethods.PUT,
                        HttpMethods.POST,
                        HttpMethods.DELETE,
                    ],
                    allowedOrigins: ['*'],
                    allowedHeaders: ['*'],
                },
            ],
            // objectOwnership: ObjectOwnership.OBJECT_WRITER,
        });

        new CfnOutput(this, 'FilesBucketOutput', {
            value: this.filesBucket.bucketName,
        });
    }
}
