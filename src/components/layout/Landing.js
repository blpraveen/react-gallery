import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import jsonp from 'jsonp';
import ExampleBasic from './ExampleBasic';
import ExampleState from './ExampleState';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

class Landing extends React.Component {
  constructor() {
    super();
    this.state = { width: -1,page: 0 };
    this.loadPhotos = this.loadPhotos.bind(this);
  }
  componentDidMount() {
    if (localStorage.jwtToken) {
    } else {
       window.location.href = "./login";
    }
    this.loadPhotos();
  }
  loadPhotos() {
    axios.get('loadImage?page='+this.state.page)
    .then(response =>{return response.data;})
    .then(result => {if(result.success) {
            let photos = result.images.map(item => {
              if(!item.width){
                item.width = 400;
              }
              if(!item.height){
                item.height = 400;
              }
        let aspectRatio = parseFloat(item.width / item.height);
        return {
          src: item.image_url,
          width: parseInt(item.width),
          height: parseInt(item.height),
          title: item.name,
          alt: item.name,
          key: item.id,
          srcSet: [
            `${item.image_url_1} ${item.width_1}w`,
            `${item.image_url_2} ${item.width_2}w`,
            `${item.image_url_3} ${item.width_3}w`,
            `${item.image_url_4} ${item.width_4}w`,
          ],
          sizes: '(min-width: 480px) 50vw, (min-width: 1024px) 33.3vw, 100vw',
        };
      });
      this.setState({
        photos: this.state.photos ? this.state.photos.concat(photos) : photos,
      });
          }
    }).catch((error) => {
        console.log(error);
         toast("Wow something went wrong!");
      })
    
  }

  render() {
    if (this.state.photos) {
      const width = this.state.width;
      return (
        <div className="App">
           <ToastContainer />
          <ExampleBasic title={'Basic Row Layout'} photos={this.state.photos.slice(0, 20)} />
        </div>
      );
    } else {
      return (
       <ExampleState  />
      );
    }
  }
}

export default Landing;
