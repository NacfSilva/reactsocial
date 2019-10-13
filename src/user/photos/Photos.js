import React, { Component } from 'react';
import './Photos.css';
import { getPhotos } from '../../util/APIUtils';
class Photos extends Component {
   
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            currentAlbum: null,
            currentAlbumName: null,
            currentAlbumCount:null
        }

    }

    
       
      componentWillMount(){
        getPhotos()
        .then(response => {
            console.log(response.cover_photo.picture)
            this.setState({
                currentAlbumPicture: response.cover_photo.picture,
                currentAlbumName: response.name,
                currentAlbumCount: response.count
              });
            
        }).catch(error => {  
        });
      }

  


    render() {
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-name">
                           <h2>{this.props.currentUser.name}</h2>
                           <p className="profile-email">{this.props.currentUser.email}</p>
                        </div>
                    </div>
                    <h4 style={{"textAlign":"center"}}>Albuns</h4>
                    <div>
                        <img src={this.state.currentAlbumPicture} alt={this.state.currentAlbumName}/>
                        <p>{this.state.currentAlbumName} ({this.state.currentAlbumCount})</p>
                    </div>
                </div>    
            </div>
        );
    }
}

export default Photos