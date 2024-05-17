import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as TopRouter } from 'react-router-dom';

import { Index } from './components';
import DnDApp from './DnDApp';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // [SOLVED] useRoutes() may be used only in the context of a Router | How to use useRoutes in Reactjs?
  // https://www.youtube.com/watch?v=6uQ5gwd8QGY
  <TopRouter>
    <React.StrictMode>
      <Index />
      {/* <DnDApp></DnDApp> */}
    </React.StrictMode>
  </TopRouter>,
);
