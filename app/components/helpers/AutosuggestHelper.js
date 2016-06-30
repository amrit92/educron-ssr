import React from 'react';
import fuzzy from 'fuzzy';

const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'C++',
    year: 1972
  },
  {
    name: 'C++',
    year: 1972
  },
  {
    name: 'C++3',
    year: 1972,
    link: ''
  },
  {
    name: 'Elm',
    year: 2012
  },
];

export function getSuggestions(value, suggestions) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  // return inputLength === 0 ? [] : options.filter(option =>
  //   option.name.toLowerCase().slice(0, inputLength) === inputValue
  // );
  var options = {
    extract: function(el) { return el.acronym + el.name; }
  };
  var results = fuzzy.filter(value, suggestions, options);
  return results.map(o=>o.original);
}

export function getSuggestionValue(suggestion) {
  return suggestion.name;
}

export function renderSuggestion(suggestion) {
  return <span>{suggestion.name}</span>;
}
