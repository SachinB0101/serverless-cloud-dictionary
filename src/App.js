import React, { useState } from 'react';

import './App.css';
import { SearchBar } from './components/Searchbar';
import { SearchResultList } from './components/SearchResultsList';

const App = () => {
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cloud Dictionary</h1>
        <SearchBar 
          setResults={setResults}
          setFilteredTerms={setFilteredTerms}
          setHasSearched={setHasSearched}
        />
        <SearchResultList 
          results={results} 
          setResults={setResults}
          setFilteredTerms={setFilteredTerms}
          setHasSearched={setHasSearched}
        />
      </header>
      <div className="dictionary-container">
        {hasSearched && filteredTerms.map((term) => (
          <div key={term.term} className="card">
            <h3>{term.term}</h3>
            <p>{term.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
