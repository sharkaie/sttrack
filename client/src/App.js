import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from './components/LoginForm';
import Panel from './components/Panel';
import RegsiterForm from './components/RegisterForm';

function App() {

  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/' component={LoginForm} />
        <Route exact path='/login' component={LoginForm} />
        <Route exact path='/register' component={RegsiterForm} />
        <Route exact path='/404' render={() => <h1>404 Not Found</h1>} />
        <Route path='/*' component={Panel} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
