import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import App from './DnDApp';
// import { App } from './CrudApp';
// import { OnSelectSlot } from './components/SelectSlot';
// import { AddChildForm } from './components_old/InputComponent';
// import { AllTodo } from './components_old/TodoList';
import { Index } from './index';
// import { View } from './components/SlotInput';
import './index.css';
=======

// import App from './DnDApp';
// import { AllTodo } from './components_temp/TodoList';
import { Index } from './components/Routes';
// import { View } from './components/SlotInput';

// import './css/reset.css';
// import './index.css';
>>>>>>> origin/second

ReactDOM.createRoot(document.getElementById('root')!).render(  
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
);
