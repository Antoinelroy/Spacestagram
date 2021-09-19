
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import heart from "./heartV3.jpg"

const url = 'https://api.nasa.gov/planetary/apod?api_key=';
const api_key = 'f9DRrc9EdtxkyKQ9CasetCZJv8jdX20P0j9LXkZ4';
const startDate = '&start_date=2021-05-08';
const endDate = '&end_date=2021-05-24';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Images: [],
      Clicked : []
    };
  };

  componentDidMount() {
    this.fetchNASAData();
  }

  notify(title, index){
    const clicked = this.state.Clicked.map((status, e) =>{
      if(index === e && status === false){
        return toast("you liked " + title);
      } else if(index === e && status === true){
        return toast("you unliked " + title);
      } else {
        return null;
      }
    })
    return clicked;
  }

  imageClicked = index => {
    
    this.setState(state => {
      const Clicked = state.Clicked.map((status, e) =>{
        if(e === index){
          if(!status){
            document.getElementById(index).className = "clicked-images";
          } else {
            document.getElementById(index).className = "container";
          }
          console.log("status = " + status);
          status = !status;
          console.log("!status = " + status);
          return status;
        } else {
          return status;
        }
      })
      return {
        Clicked,
      };
    })
  }

  fetchNASAData = async () => {

    try {
      const response = await fetch(`${url}${api_key}${startDate}${endDate}`);
      const data = await response.json();
      const clicked = [];
      for(let i = 0; i < data.length; i++){
        clicked.push(false);
      }

      this.setState({
        Images: data,
        Clicked: clicked
      });
      
    } catch (error) {
      console.log(error)
    }
    
  }
  
  
  render() {
    const images = this.state.Images.map((image, i) => (
      <div id={i} className="container" onClick={() => {
        this.imageClicked(i);
        this.notify(image.title, i);
      }}>
        <img key={i} keyProp={i} src={image.url} className="images" alt={image.title} />
        <img src={heart} alt="heart" className="hearts"/>
        <p className="titles">{image.title}<br/>{image.date}</p>
        <ToastContainer />
      </div>
    ));

    
    return (
      <div className="App-header">
        <h2>Welcome to Spacestagram!</h2>
        <div className="body">
          {images}
        </div>
      </div>
    );
  }
}

export default App;
