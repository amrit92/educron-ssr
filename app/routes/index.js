import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {redirectIfGuest, redirectIfAuthenticated} from '../redux/containers/requireAuth';

import AppMaster from '../components/layouts/master/AppMaster';

import {LoginContainer, ProfileContainer, RegisterContainer, LogoutContainer} from '../redux/containers/member/index';
import {CreatePostContainer, PostsListContainer, PostViewContainer, EditPostContainer} from '../redux/containers/posts/index';
import {UniversityViewContainer, UniversitiesListContainer} from '../redux/containers/universities/index';



module.exports= (
      <Router>
        <Route path="/" component={AppMaster}>
            <IndexRoute component={UniversitiesListContainer}/>
            <Route path="/auth">
                <Route path="register" component={redirectIfAuthenticated(RegisterContainer)}/>
                <Route path="profile" component={redirectIfGuest(ProfileContainer)}/>
                <Route path="login" component={redirectIfAuthenticated(LoginContainer)}/>
                <Route path="logout" component={redirectIfGuest(LogoutContainer,'/')}/>
            </Route>
            <Route path="/posts">
                <IndexRoute component={PostsListContainer}/>
                <Route path="create" component={redirectIfGuest(CreatePostContainer)}/>
                <Route path="edit/:id" component={redirectIfGuest(EditPostContainer)}/>
                <Route path=":id" component={PostViewContainer}></Route>
            </Route>
            <Route path="/universities">
                <IndexRoute component={UniversitiesListContainer}/>
                <Route path="create" component={redirectIfGuest(CreatePostContainer)}/>
                <Route path="edit/:id" component={redirectIfGuest(EditPostContainer)}/>
                <Route path=":id" component={UniversityViewContainer}></Route>
            </Route>
        </Route>
      </Router>
    )