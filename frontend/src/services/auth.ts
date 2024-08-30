import {
    signIn as amplifySignIn,
    signUp as amplifySignUp,
    fetchAuthSession,
} from '@aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import output from '../../../shared/output.json';

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: output['SecureVault-AuthStack'].SecureVaultUserPoolId,
            userPoolClientId: output['SecureVault-AuthStack'].SecureVaultUserPoolClientId,
        },
    },
});

export const signUp = async (
    username: string,
    password: string,
    email: string
): Promise<string | undefined> => {
    try {
        await amplifySignUp({
            username,
            password,
            options: {
                userAttributes: {
                    email,
                },
            },
        });

        const jwtToken = await getJwtToken();
        if (!jwtToken) {
            throw new Error('No JWT token found');
        }
        return jwtToken;
    } catch (error) {
        console.error(error);
    }
};

export const signIn = async (username: string, password: string) => {
    try {
        await amplifySignIn({
            username,
            password,
            options: {
                authFlowType: 'USER_PASSWORD_AUTH',
            },
        });

        const jwtToken = await getJwtToken();
        if (!jwtToken) {
            throw new Error('No JWT token found');
        }
        return jwtToken;
    } catch (error) {
        console.error(error);
    }
};

const getJwtToken = async () => {
    const session = await fetchAuthSession();
    return session.tokens?.idToken?.toString();
};
