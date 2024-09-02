import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';
import { getSuffixFromStack } from '../helpers';

export class LambdaStack extends Stack {
    public readonly lambdaIntegration: LambdaIntegration;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const lambda = new NodejsFunction(this, 'MyFunction', {
            runtime: Runtime.NODEJS_20_X,
            handler: 'handler',
            entry: join(__dirname, '..', 'services', 'handler.ts'),
            timeout: Duration.seconds(30),
            functionName: `MyFunction-${getSuffixFromStack(this)}`,
        });

        this.lambdaIntegration = new LambdaIntegration(lambda);
    }
}
