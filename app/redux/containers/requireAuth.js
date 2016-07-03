import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {pushState, hashHistory, browserHistory} from 'react-router';
import {checkToken} from '../actions/AuthAction';
import Auth from '../../api/auth/index';
import configureStore from "../store/configureStore";


export const REDIRECT_IF_GUEST = 'redirect if guest';
export const REDIRECT_IF_AUTHENTICATED = 'redirect if authenticated';

/**
 * Require auth (redirect if authenticated, or not authenticated)
 * @param Component | React Component
 * @param redirectIfNotAuthenticated | = true => redirect if not auth | false => redirect if atuh
 * @param redirect | link redirect if not match Authenticated check
 * @returns {*}
 */
export function requireAuth(Component, redirectCheck = REDIRECT_IF_GUEST, redirect = '/auth/login') {
    class AuthenticatedComponent extends React.Component {
        constructor() {
            super(...arguments);
            this.checkTokenInterval = '';
            let cv;
        }

        checkAuth(guest) {
            switch (redirectCheck) {
                case REDIRECT_IF_GUEST:
                    if (guest) {
                        let redirectAfterLogin = this.props.location.pathname;
                        browserHistory.push(`${redirect}?next=${redirectAfterLogin}`);
                    }
                    break;
                case REDIRECT_IF_AUTHENTICATED:
                    if (!guest) {
                        let nextUrl = this.props.location.query.next;
                        if (nextUrl) {
                            redirect = nextUrl;
                        }
                        browserHistory.push(redirect);
                    }
            }
        }

        componentDidUpdate() {
            // this.checkAuth(this.props.guest);
            if(this.props.rehydrated){
              this.checkAuth(this.props.guest);
            }
        }

        componentDidMount() {
            // this.checkAuth(this.props.guest);
            this.afterload();
        }

        render() {
            let component;
            switch (redirectCheck) {
                case REDIRECT_IF_GUEST:
                    component = !this.props.guest ? <Component {...this.props}/> : null;
                    break;
                case REDIRECT_IF_AUTHENTICATED:
                    component = this.props.guest ? <Component {...this.props}/> : null;
                    break;
            }
            return (
                <div>
                    {component}
                </div>
            )
        }

        afterload(){
          let pv = this.cv;
          this.cv = configureStore().getState().rehydrated;

          if(pv!=this.cv){
            this.checkAuth(this.props.guest);
          }

        }
    }

    const mapStateToProps = (state)=>({
        guest: state.auth.authenticated.guest,
        rehydrated: state.auth.rehydrated
    });

    const mapDispatchToProps = (dispatch)=>({
        actions: bindActionCreators({checkToken: checkToken}, dispatch)
    })

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}

export function redirectIfGuest(Component, redirect = "/auth/login") {
    return requireAuth(Component, REDIRECT_IF_GUEST, redirect)
}

export function redirectIfAuthenticated(Component, redirect = "/") {
    return requireAuth(Component, REDIRECT_IF_AUTHENTICATED, redirect);
}
