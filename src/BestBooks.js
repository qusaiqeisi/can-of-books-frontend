import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react'
import Jumbotron from 'react-bootstrap/Jumbotron';
import axios from 'axios';
import './BestBooks.css';

class MyFavoriteBooks extends React.Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     userEmail: '',
  //     BookList: []
  //   }
  // }
  // getInput = (e) => {
  //   this.setState({
  //     userEmail: e.target.value,

  //   })
  //   console.log(this.state.data)
  // }


  // requestData = (e) => {
  //   e.preventDefault()
  //   // let userEmail = this.state.data

  //   let axiosArray = `http://localhost:8000/book?email=${this.state.userEmail}`
  //   axios.get(axiosArray).then(response => {
  //     console.log('new one', response.data.email);
  //     this.setState({
  //       BookList: response.data.arryBooks

  //     })
  //   }).catch(err => { console.log(err) })
  //   console.log(typeof (axiosArray));
  //   console.log('booklist', this.state.BookList);
  // }

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
    console.log("mybook",this.state.myBook);
  }

  getName = (e) => {
    e.preventDefault();
    console.log('get name', e.target.value);
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
    console.log('get stauts', e.target.value);
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
    console.log('amman103',addBookURL.data);
    this.setState({
      myBook: addBookURL.data
    })
    console.log('amman107',this.state.myBook);
  }
  render() {
    return (
      <Jumbotron>
        <div>
          <h1>Best</h1>
          {/* <form>
            <input type="text" onChange={(e) => { this.getInput(e) }} />
            <button onClick={(e) => this.requestData(e)}>submit</button>
          </form> */}
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


