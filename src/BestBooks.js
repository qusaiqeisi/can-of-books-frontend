import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import axios from 'axios';
import './BestBooks.css';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      
      data: ''
    }
  }
  getInput = (e) => {
    this.setState({
      data: e.target.value,
      
    })
    console.log(this.state.data)
  }
  
  
  requestData = (e) => {
    e.preventDefault()
    let userEmail = this.state.data
    
    let axiosArray= axios.get(`http://localhost:8000/book?email=${userEmail}`).then(res => {
      console.log(res)
    }).catch(err => { console.log(err) })
  }
  
  
  render() {
    return (
      <Jumbotron>
        <div>
          <form>
            <input type="text" onChange={this.getInput} />
            <button onClick={(e) => this.requestData(e)}>submit</button>
          </form>
          <h2>{this.state.name}</h2>
          <h2>q</h2>
          <h2>q</h2>
        </div>
      </Jumbotron>
    )
  }
}

export default MyFavoriteBooks;
