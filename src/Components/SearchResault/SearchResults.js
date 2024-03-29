import React from "react";
import TrackList from '../TrackList/TrackList'
import './SearchResults.css';
export default class SearchResluts extends React.Component {
    render() {
        return(
            <div className="SearchResults">
                <h2 className="ResultsHeadline">Results</h2>
                <TrackList tracks={this.props.searchResults} onAdd = {this.props.onAdd}  isRemoval = {false}/>
            </div>
        );
    }
}