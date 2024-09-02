import { Amplify } from 'aws-amplify';
import { useEffect } from 'react';
import output from '../../shared/output.json';
import './animation.css';
import Page from './page';

const App = () => {
    useEffect(() => {
        Amplify.configure({
            Auth: {
                Cognito: {
                    userPoolId: output['SecureVault-AuthStack'].SecureVaultUserPoolId,
                    userPoolClientId: output['SecureVault-AuthStack'].SecureVaultUserPoolClientId,
                },
            },
        });
    }, []);

    return (
        <>
            <div className='lines'>
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
            </div>
            <Page />
        </>
    );
};

export default App;
