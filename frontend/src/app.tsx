import { useEffect } from 'react';
import Page from './page';
import './animation.css';

const App = () => {
    // useEffect(() => {
    //     const enteredPassword = prompt('Enter password');
    //     if (enteredPassword !== 'pwd121519') {
    //         alert('Incorrect password. Redirecting to blank page');
    //         window.location.href = 'about:blank';
    //     }
    // }, []);

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
