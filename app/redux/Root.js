import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {Router, Route, hashHistory, browserHistory} from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import Routes from '../routes';

const store = configureStore(window.__INITIAL_STATE__);
delete window.__INITIAL_STATE__;
const history = syncHistoryWithStore(browserHistory, store)

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history} routes={Routes}>
                </Router>
            </Provider>
        )
    }
}
