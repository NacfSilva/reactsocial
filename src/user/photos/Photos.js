import React, { Component } from "react";
import "./Photos.css";
import { getPhotos, getMorePhotos } from "../../util/APIUtils";


class Photos extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      listItems: null,
      nextItems: null,
      previousItems: null
    };
    this.nextlist = this.nextlist.bind(this);
    this.previouslist = this.previouslist.bind(this);
  }

  componentWillMount() {
    getPhotos()
      .then(response => {
        console.log(response);
        this.setState({
          nextItems: response.albums.paging.next,
          /*previousItems : response.data.paging.previous,*/
          listItems: response.albums.data.map(photo => (
            <li className="col-3 float-left" key={photo.id}>
              <a href="http://localhost:3000/profile">
                <img src={photo.cover_photo.picture} alt={photo.name} />
                <p>
                  {photo.name} ({photo.count})
                </p>
              </a>
            </li>
          ))
        });
      })
      .catch(error => {});
  }

  nextlist() {
    getMorePhotos(this.state.nextItems)
    .then(response => {
      console.log(response);
      this.setState({
        nextItems: response.albums.paging.next,
        /*previousItems : response.data.paging.previous,*/
        listItems: response.albums.data.map(photo => (
          <li className="col-3 float-left" key={photo.id}>
            <a href="http://localhost:3000/profile">
              <img src={photo.cover_photo.picture} alt={photo.name} />
              <p>
                {photo.name} ({photo.count})
              </p>
            </a>
          </li>
        ))
      });
    })
    .catch(error => {});
  }


  previouslist() {}

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
          <h4 style={{ textAlign: "center" }}>Albuns</h4>
          <ul>{this.state.listItems}</ul>
        </div>
        <div className="Buttons-space">
        
          <button type="button" onClick={() => this.previouslist()}>
            Previous
          </button>
          <button type="button" onClick={() => this.nextlist()}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Photos;
