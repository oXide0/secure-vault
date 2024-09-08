import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';
import { getSuffixFromStack } from '../helpers';

interface LambdaStackProps extends StackProps {
    filesTable: ITable;
}

export class LambdaStack extends Stack {
    public readonly lambdaIntegration: LambdaIntegration;

    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props);

        const lambda = new NodejsFunction(this, 'MyFunction', {
            runtime: Runtime.NODEJS_20_X,
            handler: 'handler',
            entry: join(__dirname, '..', 'services', 'handler.ts'),
            timeout: Duration.seconds(30),
            functionName: `MyFunction-${getSuffixFromStack(this)}`,
            environment: {
                FILES_TABLE: props.filesTable.tableName,
            },
        });

        lambda.addToRolePolicy(
            new PolicyStatement({
                effect: Effect.ALLOW,
                resources: [props.filesTable.tableArn],
                actions: [
                    'dynamodb:Scan',
                    'dynamodb:PutItem',
                    'dynamodb:GetItem',
                    'dynamodb:UpdateItem',
                    'dynamodb:DeleteItem',
                ],
            })
        );

        this.lambdaIntegration = new LambdaIntegration(lambda);
    }
}
