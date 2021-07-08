import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react'
import Jumbotron from 'react-bootstrap/Jumbotron';
import axios from 'axios';
import './BestBooks.css';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myBook: [],
      name: '',
      description: '',
      status: '',
      show: false
    }
  }


  componentDidMount() {
    this.getBooks();
  }

  getBooks = async () => {
    console.log('test');
    const { user } = this.props.auth0;
    const urlBooks = `http://localhost:8000/book?email=${user.email}`;
    const reqBook = await axios.get(urlBooks);
    console.log(reqBook.data.arryBooks);
    this.setState({
      myBook: reqBook.data.arryBooks
    })
    ;
  }

  getName = (e) => {
    e.preventDefault();
    
    this.setState({
      name: e.target.value
    })
  }
  getDescription = (e) => {
    e.preventDefault();
    this.setState({
      description: e.target.value
    })
  }
  getStatus = (e) => {
    e.preventDefault();
    
    this.setState({
      status: e.target.value
    })
  }


  addBook = async (e) => {
    e.preventDefault();
    const { user } = this.props.auth0;
    const bookData = {
      name: this.state.name,
      description: this.state.description,
      status: this.state.status,
      email: user.email
    }
    console.log(bookData);
    const addBookURL = await axios.post('http://localhost:8000/addbook', bookData);
   
    this.setState({
      myBook: addBookURL.data
    })
    
  }
  render() {
    return (
      <Jumbotron>
        <div>
          <h1>Best</h1>
          <div>
            <form onSubmit={(e) => this.addBook(e)}>
              <label>Name:</label>
              <input type="text" onChange={(e) => this.getName(e)}></input>
              <label>Decription:</label>
              <input type="text" onChange={(e) => this.getDescription(e)}></input>
              <label>Status:</label>
              <input type="text" onChange={(e) => this.getStatus(e)}></input>
              <br></br>
              <button type="submit">Add Book</button>
            </form>
          </div>
          <ol>

            {this.state.myBook.map(book => {

              return <li>{book.name}</li>
            })}
          </ol>


        </div>
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks)


