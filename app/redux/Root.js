import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {Router, Route, hashHistory, browserHistory} from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import Routes from '../routes';
import saveStore from './store/saveStore';
import {persistStore, autoRehydrate, storages} from 'redux-persist'


// let currentState = {};
// const previousStore = window.localStorage.getItem('currentState');

// if (previousStore) {
//     try {
//         currentState = JSON.parse(previousStore);
//     } catch (e) {

//     }
// }

// const store = configureStore(currentState);
// saveStore(store);

// window.store = store;
// const history = syncHistoryWithStore(browserHistory, store)

const store = configureStore();
delete window.__INITIAL_STATE__;
const history = syncHistoryWithStore(browserHistory, store)
persistStore(store, {storage: storages.localStorage, blacklist: ["routing"]});
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
