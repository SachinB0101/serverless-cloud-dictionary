import React from "react";
import "./SearchResultsList.css"

export const SearchResultList = ({results}) => {
    return (
        <div className="search-results-container">
            <div className="search-results-list">
                {results.map((result, id) => (
                    <div key={id} className="search-result-item">
                        {result.term}
                    </div>
                ))}
            </div>
        </div>
    )
}