import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewEmployer from './pages/NewEmployer';


export default function Routes() { // a function é exatamente o nome do componente
  return (
    <BrowserRouter>
      <Switch>
        <Route path = "/" // path é o caminho que será acessado
          exact // serve para que a rota acessada seja exatamente essa
          component={Logon}  // é o componente que será acessado pelo path
        />
        <Route path = "/register" component={Register}/>

        <Route path = "/profile" component={Profile} />
        <Route path = "/employees/new" component={NewEmployer} />
      </Switch>
    </BrowserRouter>
  )
}