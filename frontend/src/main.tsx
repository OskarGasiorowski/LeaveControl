import '@fontsource/poppins';
import '@fontsource/dm-sans';

import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Suspense>
        <StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrictMode>
    </Suspense>,
);
