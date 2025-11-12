import React from "react";
import "./SearchResultsList.css"
import axios from 'axios';

export const SearchResultList = ({results, setResults, setFilteredTerms, setHasSearched}) => {

    const handleResultClick = (result) => {
        console.log('Clicked result:', result);
        const apiUrl = process.env.REACT_APP_API_URL;

        setResults([]);

        axios
            .get(`${apiUrl}/get-definition?term=${encodeURIComponent(result.term)}`)
            .then(response => {
                console.log('Only Response:', response);
                if(response.status === 204){
                    console.log("Message no result for the query");
                    setFilteredTerms([]);
                }else{
                    console.log(response.data.results[0]);
                    setFilteredTerms(response.data.results);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        setHasSearched(true);
    };
    return (
        <div className="search-results-container">
            <div className="search-results-list">
                {results.map((result, id) => (
                    <div 
                        key={id} 
                        className="search-result-item"
                        onClick={() => handleResultClick(result)}
                    >
                        {result.term}
                    </div>
                ))}
            </div>
        </div>
    )
}