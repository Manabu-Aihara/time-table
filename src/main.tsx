import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './DnDApp';
// import { App } from './CrudApp';
// import { OnSelectSlot } from './components/SelectSlot';
// import { AddChildForm } from './components_old/InputComponent';
// import { AllTodo } from './components_old/TodoList';
import { Index } from './index';
// import { View } from './components/SlotInput';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(  
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
);
