import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';

import { App } from './app/Index';

import './styles.less';

// setup fake backend
// import { configureFakeBackend } from './_helpers/fake-backend';
// configureFakeBackend();

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
);