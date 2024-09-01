import { fetchAuthSession, signIn, signUp, confirmSignUp } from '@aws-amplify/auth';
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

interface AuthProps {
    email: string;
    password: string;
}

export const registerUser = async ({ email, password }: AuthProps): Promise<void> => {
    try {
        await signUp({
            username: email,
            password,
            options: {
                userAttributes: {
                    email,
                },
            },
        });
    } catch (error) {
        console.error(error);
    }
};

interface ConfirmProps {
    email: string;
    code: string;
}

export const confirmUserSignUp = async ({ email, code }: ConfirmProps): Promise<string> => {
    await confirmSignUp({ username: email, confirmationCode: code });
    const jwtToken = await getJwtToken();
    console.log(jwtToken);
    return jwtToken;
};

export const loginUser = async ({ email, password }: AuthProps) => {
    try {
        await signIn({
            username: email,
            password,
        });

        const jwtToken = await getJwtToken();
        console.log(jwtToken);
        return jwtToken;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to login');
    }
};

export const getJwtToken = async (): Promise<string> => {
    const session = await fetchAuthSession();
    if (!session.tokens?.idToken) {
        throw new Error('No JWT token found');
    }
    return session.tokens.idToken.toString();
};
