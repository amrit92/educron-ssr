import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {setTitle, reduxAwait} from '../../../utils/index';
import {UniversitiesList} from '../../../components/pages/universities/index';
import {clearSuggestions, loadSuggestionsBegin, loadSuggestions, maybeUpdateSuggestions, updateInputValue, getAllSuggestions} from '../../actions/UniversityAction';

class UniversitiesListContainer extends Component{
	constructor() {
        super(...arguments);
    }

    componentDidMount(){
        this.props.getAllSuggestions();
        setTitle('Home');
    }

    render(){
        return (
            <UniversitiesList {...this.props}/>
        )
    }
}

const mapStateToProps = (state, ownProps)=> {
    return {
	    value: state.results.value,
	    suggestions: state.results.suggestions,
	    allSuggestions: state.results.allSuggestions,
	    isLoading: state.results.isLoading
	  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange(event, { newValue }) {
      dispatch(updateInputValue(newValue));

      const value = newValue.trim();

      if (value === '') {
        dispatch(clearSuggestions());
      }
    },
    onSuggestionsUpdateRequested({ value }) {
      dispatch(loadSuggestions(value));
    },
    getAllSuggestions(){
      dispatch(getAllSuggestions());
    }
  };
}


export default reduxAwait.connect(mapStateToProps, mapDispatchToProps)(UniversitiesListContainer);