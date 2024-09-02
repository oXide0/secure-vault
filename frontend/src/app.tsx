import { Amplify } from 'aws-amplify';
import { useEffect, useState } from 'react';
import output from '../../shared/output.json';
import './animation.css';
import Page from './page';
import { getCurrentUser } from '@aws-amplify/auth';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        Amplify.configure({
            Auth: {
                Cognito: {
                    userPoolId: output['SecureVault-AuthStack'].SecureVaultUserPoolId,
                    userPoolClientId: output['SecureVault-AuthStack'].SecureVaultUserPoolClientId,
                },
            },
        });

        async function checkAuth() {
            try {
                const user = await getCurrentUser();
                setIsAuthenticated(!!user);
            } catch (error) {
                console.error(error);
            }
        }
        checkAuth();
    }, []);

    return (
        <>
            <div className='lines'>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
            </div>
            <Page isAuth={isAuthenticated} setIsAuth={setIsAuthenticated} />
        </>
    );
};

export default App;
