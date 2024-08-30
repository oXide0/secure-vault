import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CdkStack } from '../lib/AuthStack';

test('Base test', () => {
    const app = new App();
    // WHEN
    const stack = new CdkStack(app, 'MyTestStack');
    // THEN
    const assert = Template.fromStack(stack);
    assert.resourceCountIs('AWS::S3::Bucket', 1);
});
