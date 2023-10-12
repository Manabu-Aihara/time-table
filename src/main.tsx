import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './DnDApp'
// import { App } from './CrudApp'
// import { OnSelectSlot } from './components/SelectSlot'
import { AddChildForm } from './components/InputComponent'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AddChildForm todoSummary="Teat" owner='Me' />
  </React.StrictMode>,
)
