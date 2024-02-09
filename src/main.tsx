import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import App from './DnDApp';
// import { AllTodo } from './components_temp/TodoList';
import { Index } from './index';
// import { View } from './components/SlotInput';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(  
  <React.StrictMode>
    <ChakraProvider>
      <Index />
    </ChakraProvider>
  </React.StrictMode>,
);
