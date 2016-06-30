import {AWAIT_MARKER} from 'redux-await';
import UniversityApi from '../../api/university/index';
import {getSuggestions} from '../../components/helpers/AutosuggestHelper';
export const RESULT_VIEW = 'result view';
export const UNIVERSITY_VIEW = 'university view';
export const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
export const CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS';
export const MAYBE_UPDATE_SUGGESTIONS = 'MAYBE_UPDATE_SUGGESTIONS';
export const LOAD_SUGGESTIONS_BEGIN = 'LOAD_SUGGESTIONS_BEGIN';
export const GET_ALL_SUGGESTIONS = 'GET_ALL_SUGGESTIONS';
export const GET_ALL_SUGGESTIONS_COMPLETED = 'GET_ALL_SUGGESTIONS_COMPLETED';
export const GET_ALL_SUGGESTIONS_FAILED = 'GET_ALL_SUGGESTIONS_FAILED';

export function getResultSummary(id) {
    return (dispatch) => {
        dispatch({
            type: RESULT_VIEW,
            AWAIT_MARKER,
            payload: {
                getResultSummary: UniversityApi.getResultSummary(id)
            }
        })
    }
}

export function getUniversityView(id) {
    return (dispatch) => {
        dispatch({
            type: UNIVERSITY_VIEW,
            AWAIT_MARKER,
            payload: {
                getUniversityView: UniversityApi.getUniversity(id)
            }
        })
    }
}

export function loadSuggestions(value) {
  return (dispatch, getState) => {
    dispatch(loadSuggestionsBegin());
    setTimeout(() => {
      dispatch(maybeUpdateSuggestions(getSuggestions(value, getState().results.allSuggestions), value));
    }, 300);
    
  };
}

export function updateInputValue(value) {
  return {
    type: UPDATE_INPUT_VALUE,
    value
  };
}

export function clearSuggestions() {
  return {
    type: CLEAR_SUGGESTIONS
  };
}

export function loadSuggestionsBegin() {
  return {
    type: LOAD_SUGGESTIONS_BEGIN
  };
}

export function maybeUpdateSuggestions(suggestions, value) {
  return {
    type: MAYBE_UPDATE_SUGGESTIONS,
    suggestions,
    value
  };
}

// export function getAllSuggestions() {
//   return (dispatch) => {
//         dispatch({
//             type: GET_ALL_SUGGESTIONS,
//             AWAIT_MARKER,
//             payload: {
//               allSuggestions: UniversityApi.getUnilist()
//             }
//         })
//     }
// }

export function getAllSuggestions() {
   return (dispatch, getState) => {
       dispatch({type: GET_ALL_SUGGESTIONS});
       UniversityApi.getUnilist().then(allSuggestions => {
           dispatch({type: GET_ALL_SUGGESTIONS_COMPLETED, payload: {allSuggestions}})
       }).catch(error => {
           dispatch({type: GET_ALL_SUGGESTIONS_FAILED, error: error});
       })
   }
}

export function getAllSuggestionsCompleted(suggestions) {
  return {
    type: GET_ALL_SUGGESTIONS_COMPLETED,
    suggestions,
  };
}

export function getAllSuggestionsFailed(suggestions) {
  return {
    type: GET_ALL_SUGGESTIONS_FAILED,
    suggestions,
  };
}
const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'C#',
    year: 2000
  },
  {
    name: 'C++',
    year: 1983
  },
  {
    name: 'Clojure',
    year: 2007
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Go',
    year: 2009
  },
  {
    name: 'Haskell',
    year: 1990
  },
  {
    name: 'Java',
    year: 1995
  },
  {
    name: 'Javascript',
    year: 1995
  },
  {
    name: 'Perl',
    year: 1987
  },
  {
    name: 'PHP',
    year: 1995
  },
  {
    name: 'Python',
    year: 1991
  },
  {
    name: 'Ruby',
    year: 1995
  },
  {
    name: 'Scala',
    year: 2003
  }
];

function getMatchingLanguages(value) {
  const escapedValue = value.trim();
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return languages.filter(language => regex.test(language.name));
}