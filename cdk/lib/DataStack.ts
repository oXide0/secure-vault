import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { AnyPrincipal, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { HttpMethods, IBucket, Bucket as S3Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { getSuffixFromStack } from '../helpers';

export class DataStack extends Stack {
    public readonly filesBucket: IBucket;
    public readonly filesTable: ITable;

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

        this.filesBucket.addToResourcePolicy(
            new PolicyStatement({
                actions: ['s3:PutObject', 's3:GetObject'],
                resources: [`${this.filesBucket.bucketArn}/*`],
                principals: [new AnyPrincipal()],
            })
        );

        this.filesTable = new Table(this, 'FilesTable', {
            partitionKey: { name: 'id', type: AttributeType.STRING },
            tableName: `FilesTable-${getSuffixFromStack(this)}`,
        });

        new CfnOutput(this, 'FilesBucketName', {
            value: this.filesBucket.bucketName,
        });
    }
}
