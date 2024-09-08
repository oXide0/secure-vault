import { Stack, StackProps } from 'aws-cdk-lib';
import {
    AuthorizationType,
    CognitoUserPoolsAuthorizer,
    Cors,
    LambdaIntegration,
    MethodOptions,
    ResourceOptions,
    RestApi,
} from 'aws-cdk-lib/aws-apigateway';
import { IUserPool } from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

interface ApiStackProps extends StackProps {
    lambdaIntegration: LambdaIntegration;
    userPool: IUserPool;
}

export class ApiStack extends Stack {
    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props);

        const api = new RestApi(this, 'RestApi');

        const authorizer = new CognitoUserPoolsAuthorizer(this, 'ApiAuthorizer', {
            cognitoUserPools: [props.userPool],
            identitySource: 'method.request.header.Authorization',
        });
        authorizer._attachToApi(api);

        const optionsWithAuth: MethodOptions = {
            authorizationType: AuthorizationType.COGNITO,
            authorizer: {
                authorizerId: authorizer.authorizerId,
            },
        };

        const optionsWithCors: ResourceOptions = {
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS,
                allowMethods: Cors.ALL_METHODS,
            },
        };

        const Resource = api.root.addResource('files', optionsWithCors);
        Resource.addMethod('GET', props.lambdaIntegration, optionsWithAuth);
        Resource.addMethod('POST', props.lambdaIntegration, optionsWithAuth);
        Resource.addMethod('PUT', props.lambdaIntegration, optionsWithAuth);
        Resource.addMethod('DELETE', props.lambdaIntegration, optionsWithAuth);
    }
}
