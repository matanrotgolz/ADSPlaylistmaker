import React from 'react';
import './Track.css';
import './audio.css';

export default  class Track extends React.Component {
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    renderAction(){
        if(this.props.isRemoval){
            return <button className="Track-action" onClick = {this.removeTrack}>-</button>
        }
        else{
           return  <button className="Track-action" onClick = {this.addTrack}>+</button>
        }
    }
    addTrack(){
        this.props.onAdd(this.props.track);
    }
    removeTrack(){
        this.props.onRemove(this.props.track);
    }

    render(){
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist}| {this.props.track.album} </p>
                    { this.props.preview === 'Preview is not available' ? <p>{this.props.preview}</p> : <p className="Preview">Preview | <video controls className = 'audio' name="media"><source src={this.props.preview} type="audio/mpeg"></source></video></p> }
                </div>
                {console.log(this.props.track.preview)}
                {this.renderAction()}
            </div>
        );
    }
}

