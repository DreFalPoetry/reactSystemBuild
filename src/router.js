import React from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom'
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import Buttons from './pages/ui/buttons'
import BasicTable from './pages/table/basicTable'
import NoMatch from './pages/noMatch'
import Common from './common';

export default class IRouter extends React.Component{
  render(){
    return (
      <HashRouter>
        <App>
          <Route path="/login" component={Login}></Route>
          <Route path="/admin" render={()=>(
            <Admin>
              <Switch>
                <Route path="/admin/ui/buttons" component={Buttons}></Route>  
                <Route path="/admin/table/basic" component={BasicTable}></Route>  
                <Route component={NoMatch}></Route>  
              </Switch>
            </Admin>
          )}></Route>
          <Route path="/common" render={()=>(
            <Common>
              <Route path="/common/order/detail/:orderId" component={Login} />
            </Common>
          )} />
        </App>
      </HashRouter> 
    )
  }
}