#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { getStackId } from '../helpers';
import { AuthStack } from '../lib/AuthStack';
import { LambdaStack } from '../lib/LambdaStack';
import { DataStack } from '../lib/DataStack';
import { ApiStack } from '../lib/ApiStack';

const app = new App();
const authStack = new AuthStack(app, getStackId('AuthStack'));
const lambdaStack = new LambdaStack(app, getStackId('LambdaStack'));
new ApiStack(app, getStackId('ApiStack'), {
    lambdaIntegration: lambdaStack.lambdaIntegration,
    userPool: authStack.userPool,
});
new DataStack(app, getStackId('DataStack'));
