import React, {useState, useCallback, useRef} from "react";
import axios from 'axios';
import { useDebounce } from '../hooks'

export const SearchBar = ({setResults, setFilteredTerms, setHasSearched}) => {
    const [terms, setTerms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const lastValueRef = useRef(''); // store last searched value

    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSearch = useCallback((value) => {
        if (value === lastValueRef.current) return;

        lastValueRef.current = value;

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
    }, [apiUrl, setResults, setFilteredTerms]);

    // Debounce the search function with 500ms delay
    const debouncedSearch = useDebounce(handleSearch, 300);

    const handleChange = (value) => {
        setHasSearched(false);
        setSearchTerm(value);
        debouncedSearch(value);
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