import React from "react";
import './SearchBar.css';
class SearchBar extends React.Component {
    constructor(props) {
        /*console.log('SearchBar Accessed');*/
        super(props);
        /*console.log('SearchBar Props Accessed');*/
        this.state = {term:''};
        /*console.log('SearchBar Term Accessed' , this.state.term);*/
        this.search = this.search.bind(this);
        /*if(this.search){
            console.log('this.search has been bind');
            console.log(this.props.onSearch);
        }*/
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search(){
        this.props.onSearch(this.state.term);
     
    }

    handleTermChange(event){
        this.setState({term:event.target.value});
       
    }
 
    render(){
        return (
            <div className="SearchBar">
                <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}

export default  SearchBar;