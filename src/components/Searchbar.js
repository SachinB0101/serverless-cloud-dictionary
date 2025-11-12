import React, {useState} from "react";
import axios from 'axios';

export const SearchBar = ({setResults, setFilteredTerms, setHasSearched}) => {
    const [terms, setTerms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSearch = (value) => {
            if (!value) {
            console.log('Empty search term, skipping API call');
            setTerms([]);
            setFilteredTerms([]);
            setResults([]);
            return;
        }

        console.log('Fetching data from API...');

        axios
        .get(`${apiUrl}/get-definition?term=${encodeURIComponent(value)}`)
        .then(response => {
        console.log('searchTerm', value);
        console.log('Only Response:', response);
        if(response.status === 204){
            console.log("Message no result for the query");
            setResults([]);
            setFilteredTerms([]);
        }else{
            console.log(response.data.results[0]);
            setResults(response.data.results);
            setFilteredTerms(response.data.results);
        }
        })
        .catch(error => {
        console.error('Error fetching data:', error);
    });
  };

  const handleChange = (value) =>{
    setHasSearched(false);
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleHasSearched = () => {
    setHasSearched(true);
    setResults([]);
  };

    return(
        <div>
            <input
            type="text"
            placeholder="Search for a term"
            value={searchTerm}
            onChange={(e) => handleChange(e.target.value)}
            />
            <button onClick={() => handleHasSearched()}>Search</button>

        </div>
    )
}
