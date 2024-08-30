import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { AccountRecovery, UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';
import { getStackId } from '../helpers';

export class AuthStack extends Stack {
    public userPool: UserPool;
    public userPoolClient: UserPoolClient;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.createUserPool();
        this.createUserPoolClient();
    }

    private createUserPool() {
        this.userPool = new UserPool(this, getStackId('UserPool'), {
            signInAliases: {
                username: true,
                email: true,
            },
            autoVerify: {
                email: true,
            },
            accountRecovery: AccountRecovery.EMAIL_ONLY,
        });

        new CfnOutput(this, getStackId('UserPoolId'), {
            value: this.userPool.userPoolId,
        });
    }

    private createUserPoolClient() {
        this.userPoolClient = new UserPoolClient(this, getStackId('UserPoolClient'), {
            userPool: this.userPool,
        });

        new CfnOutput(this, getStackId('UserPoolClientId'), {
            value: this.userPoolClient.userPoolClientId,
        });
    }
}
