import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from 'react-router-dom'

import { useAuthContext } from '../shared/context/auth-context'
import Auth from '../pages/Auth/Auth'

const Protected = React.lazy(() => import('../pages/Protected/Protected'))

const Routes = () => {
  const { token } = useAuthContext();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route exact path='/'>
          <Protected />
        </Route>

        <Redirect to='/' />
      </Switch>
    )

  } else {
    routes = (
      <Switch>
        <Route exact path='/auth'>
          <Auth />
        </Route>

        <Redirect to='/auth' />
      </Switch>
    )
  }

  return (
    <Router>
      <main>
        <Suspense fallback='Loading...'>
          { routes }
        </Suspense>
      </main>
    </Router>

  );
};

export default Routes;