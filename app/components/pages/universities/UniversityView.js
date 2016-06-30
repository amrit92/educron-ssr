import React, {Component, PropTypes} from 'react';
import {Grid, Col} from 'react-bootstrap';
import {Editors, WrapContainer, Loading} from '../../form/index';
import ReactTypeahead from 'react-typeahead';
import CustomTypeaheadList from '../../CustomTypeaheadList'
import Autosuggest from 'react-autosuggest';
import { getSuggestions, getSuggestionValue, renderSuggestion } from '../../helpers/AutosuggestHelper';
import autosuggestTheme from '../../../stylesheets/_autosuggest.scss';
import { hashHistory } from 'react-router';

export default class UniversityView extends Component {
    constructor() {
        super(...arguments)
    }


    render() {        
        let {university, isAuthor, awaitStatuses, awaitErrors} = this.props;
        return (
            <WrapContainer animateIn="fadeIn">
                {awaitStatuses.getUniversityView == 'pending' && <Loading text=""/>}
                {awaitStatuses.getUniversityView == 'success' && 

                <div className="post-view">
                    <div className="clearfix">
                        <div className="pull-left">
                            <h1 className="title">{university.name}</h1>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-lg-8">
                      <div className="row text-center">
                        <div className="col-sm-3 col-xs-6">
                          <h3>NA</h3>
                          <small>university</small>
                        </div>
                        <div className="col-sm-3 col-xs-6">
                          <h3>NA</h3>
                          <small>acceptance rate</small>
                        </div>
                        <div className="col-sm-3 col-xs-6">
                          <h3>NA</h3>
                          <small>average GRE</small>
                        </div>
                      </div>
                      <div className="clearfix">
                      </div>
                      <hr/>
                      <div className="row text-center">
                        <div className="col-sm-3 col-xs-6">
                          <h3>NA</h3>
                          <small>Tuition</small>
                        </div>
                      </div>
                    </div>

                    <div className="col-xs-6 col-lg-4">
                      
                    </div>
                    <div className="clearfix">
                    </div>
                    <hr/>
                    <div className="col-sm-6">
                      <h4> Course List</h4>
                      <ul class="university-course-list">
                        <li>
                          <a href="/NA">NA</a>
                        </li>
                      </ul>
                    </div>

                    <div className="clearfix">
                    </div>
                    <hr/>

                    <div className=" col-xs-18 col-sm-12 col-lg-12">
                        <h4> Description</h4>
                        <p> {university.info} </p>
                    </div>
                </div>
                }
                {awaitErrors.getUniversityView &&
                <p>{awaitErrors.getUniversityView}</p>
                }
            </WrapContainer>
        )
    }
}

UniversityView.propTypes = {
    university: PropTypes.shape({
        user: PropTypes.object
    }),
    isAuthor: PropTypes.bool,
    awaitStatuses:PropTypes.shape({
        getUniversityView: PropTypes.string
    }),
    awaitErrors:PropTypes.shape({
        getUniversityView: PropTypes.string
    })
}
