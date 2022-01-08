import React from 'react';
import 'C:/Users/matan/OneDrive/Desktop/React/jamming/src/Components/App/App.css';
import SearchBar from 'C:/Users/matan/OneDrive/Desktop/React/jamming/src/Components/SearchBar/SearchBar.js';
import  SearchResults from 'C:/Users/matan/OneDrive/Desktop/React/jamming/src/Components/SearchResault/SearchResults.js';
import Playlist from 'C:/Users/matan/OneDrive/Desktop/React/jamming/src/Components/Playlist/Playlist.js';
import Spotify from '../../util/Spotify';
export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {searchResults :[],
    PlaylistName:'My Playlist',
    PlaylistTracks:[],
    audioSrc : 'https://www.youtube.com/watch?v=LYI3eegIJlI'
  };
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack =  this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);
}
  addTrack(track){
    let tracks = this.state.PlaylistTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    tracks.push(track);
    this.setState({PlaylistTracks:tracks})
  }
  removeTrack(track){
    let tracks = this.state.PlaylistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({PlaylistTracks:tracks});
  }
  updatePlaylistName(PlaylistName) {
    this.setState({PlaylistName:PlaylistName});
  }

  savePlaylist(){
    const trackURIs = this.state.PlaylistTracks.map(track => track.uri);
    Spotify.savePlaList(this.state.PlaylistName,trackURIs).then(()=>{
      this.setState({
        PlaylistName:'New Playlist',
        playlistTrack :[]
      })
    });
  }
  search(term){
      console.log(term);
      Spotify.search(term).then(searchResults =>{
      this.setState({searchResults: searchResults});
      console.log(this.state.searchResults);
    })   
  }
  render() {
    return (
          <div>
            <h1>ADS<span className="highlight">Playlist</span>Maker</h1>
            <div className="App">
              <SearchBar onSearch={this.search}/>
              <div className="App-playlist">
                <SearchResults searchResults = {this.state.searchResults} onAdd = {this.addTrack}  />
                <Playlist PlaylistName = {this.state.PlaylistName} playlistTrack = {this.state.PlaylistTracks}  onRemove = {this.removeTrack} onNameChange = {this.updatePlaylistName}
                onSave = {this.savePlaylist}/>
              </div>
            </div>
          </div>
    );
  }
}

/*      Spotify.search(term).then(searchResults =>{
      this.setState({searchResults: searchResults});
      console.log(searchResults);
    })   
{name:'name1' , artist:'artist1',album:'album1',id:1},{name:'name2' , artist:'artist2',album:'album2',id:2}*/

