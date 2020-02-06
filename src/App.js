import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";
import Homepage from './views/Homepage'
import SearchPage from './views/SearchPage'
import AlbumDetail from './views/AlbumDetail'
import PageNotFound from './views/PageNotFound'
import {Provider} from 'react-redux'
import store from './store'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function QueryParamsValidation() {
  const query = useQuery()
  const artist = query.get('artist')

  if (!artist) {
    return <Redirect to="/" />
  }
  return <SearchPage></SearchPage>
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/album/:artistId/:albumId'>
            <AlbumDetail></AlbumDetail>
          </Route>
          <Route exact path='/search'>
            <QueryParamsValidation></QueryParamsValidation>
          </Route>
          <Route exact path='/'>
            <Homepage></Homepage>
          </Route>
          <Route>
            <PageNotFound></PageNotFound>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
