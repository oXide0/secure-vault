#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { getStackId } from '../helpers';
import { AuthStack } from '../lib/AuthStack';

const app = new App();
new AuthStack(app, getStackId('AuthStack'));
