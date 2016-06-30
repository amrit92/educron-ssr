import {
    RESULT_VIEW, UNIVERSITY_VIEW, UPDATE_INPUT_VALUE, GET_ALL_SUGGESTIONS,GET_ALL_SUGGESTIONS_COMPLETED, GET_ALL_SUGGESTIONS_FAILED, CLEAR_SUGGESTIONS, MAYBE_UPDATE_SUGGESTIONS, LOAD_SUGGESTIONS_BEGIN
} from '../actions/UniversityAction';
import update from 'react-addons-update';
import {createReducer} from 'redux-create-reducer';
import {postsList} from '../../configs/index';

const getInitialState = () => {
    return {
        lists: [],
        currentItems: postsList.perPage, //pagination
        currentUniversity: {
            user: {}
        },
        currentResult: {
            user: {}
        },
        value: '',
        isLoading: true,
        suggestions: [],
        allSuggestions: []
    }
}

export default createReducer(getInitialState(), {
    [RESULT_VIEW](state, action){
        return update(state, {
            currentResult: {$set: action.payload.getResultSummary}
        });
    },
    [UNIVERSITY_VIEW](state, action){
        return update(state, {
            currentUniversity: {$set: action.payload.getUniversityView}
        });
    },
    [GET_ALL_SUGGESTIONS_COMPLETED](state, action){
        return update(state, {
            allSuggestions: {$set: action.payload.allSuggestions}
        });
    },
    [UPDATE_INPUT_VALUE](state, action){
        return update(state, {
            value: {$set: action.value}
        });
    },
    [CLEAR_SUGGESTIONS](state, action){
        return update(state, {
            suggestions: {$set: []}
        });
    },
    [LOAD_SUGGESTIONS_BEGIN](state, action){
        return update(state, {
            isLoading: {$set: true}
        });
    },
    [MAYBE_UPDATE_SUGGESTIONS](state, action){
        if(action.value !== state.value) {
        return update(state, {
            isLoading: {$set: false}
        });
      }
        return update(state, {
            suggestions: {$set: action.suggestions},
            isLoading: {$set: false}
        });
    }
});

