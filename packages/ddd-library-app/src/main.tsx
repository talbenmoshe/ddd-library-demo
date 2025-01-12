import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { LibraryWebEntry } from 'ddd-library-react';
import { AxiosHttpClientFactory } from './AxiosHttpClient/AxiosHttpClientFactory';

const factory = new AxiosHttpClientFactory();
const instance = factory.createInstance('http://localhost:5001');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LibraryWebEntry httpClient={instance} />
  </StrictMode>
);
