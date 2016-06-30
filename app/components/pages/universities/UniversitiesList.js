import React, {Component, PropTypes} from 'react';
import {Grid, Col} from 'react-bootstrap';
import {Editors, WrapContainer, Loading} from '../../form/index';
import ReactTypeahead from 'react-typeahead';
import CustomTypeaheadList from '../../CustomTypeaheadList'
import Autosuggest from 'react-autosuggest';
import {getSuggestions, getSuggestionValue, renderSuggestion} from '../../helpers/AutosuggestHelper';
import autosuggestTheme from '../../../stylesheets/_autosuggest.scss';
import {hashHistory} from 'react-router'
import UniversityApi from '../../../api/university/index';


export default class UniversitiesList extends Component {
    constructor() {
        super(...arguments)
        this.state = {
          value: '',
          suggestions: [],
          allSuggestions: []
        };

        // this.onChange = this.onChange.bind(this);
        // this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
    }

    // onChange(event, { newValue }) {
    //     this.setState({
    //       value: newValue
    //     });
    //   }

    // onSuggestionsUpdateRequested({ value }) {
    //     this.setState({
    //       suggestions: getSuggestions(value, this.state.allSuggestions)
    //     });
    //   }
    onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }) {
        hashHistory.push('universities/' + suggestion.id);
      }

    componentDidUpdate() {
      // let component = this;
      // UniversityApi.getUnilist().then(function(result) {
      //   component.setState({
      //     suggestions: result,
      //     allSuggestions: result
      //   });
      // })
    }

    render() {
        const { value, suggestions, isLoading, onChange, onSuggestionsUpdateRequested, allSuggestions } = this.props;
        const inputProps = {
          placeholder: 'Search University',
          value,
          onChange
        };
        let allSuggestionsResolved = [];
        if(this.props.awaitStatuses.allSuggestions == 'resolved'){
          allSuggestions.map(function(value) {console.log(value);})
        }
        return (
            <WrapContainer animateIn="fadeIn">
                <div className="university-list">
                    <div className="university-search-heading">
                        <h1 className="title">{"Find your Dream University"}</h1>
                    </div>
                  <div className="col-sm-offset-2 col-sm-8 university-search">
                    
                    <Autosuggest suggestions={suggestions}
                      onSuggestionsUpdateRequested={onSuggestionsUpdateRequested}
                      getSuggestionValue={getSuggestionValue}
                      renderSuggestion={renderSuggestion}
                      onSuggestionSelected={this.onSuggestionSelected}
                      inputProps={inputProps} 
                      theme={{
                        input: "react-autosuggest__input form-control input-lg",
                        container: 'react-autosuggest__container',
                        containerOpen:'react-autosuggest__container--open',
                        suggestionsContainer: 'react-autosuggest__suggestions-container',
                        suggestion: 'react-autosuggest__suggestion',
                        suggestionFocused: 'react-autosuggest__suggestion--focused',
                        sectionContainer: 'react-autosuggest__section-container',
                        sectionTitle: 'react-autosuggest__section-title',
                        sectionSuggestionsContainer: 'react-autosuggest__section-suggestions-container'

                      }}/>
                      
                  </div>
                </div>
            </WrapContainer>
        )
    }
}

UniversitiesList.propTypes = {
  awaitStatuses: PropTypes.shape({
        allSuggestions: PropTypes.string
    })
}
