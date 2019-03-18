import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Route,Switch } from 'react-router-dom';
import  CampaignDetail   from './components/CampaignDetail.jsx';
import { Provider } from 'react-redux';

// redux store
import { store } from './reducers/store.jsx';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>    
            <Switch>
              <Route path="/" component={CampaignDetail} />
            </Switch>
        </Router>
      </Provider>            
    );
  }
}

export default App;
