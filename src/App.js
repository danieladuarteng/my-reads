import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {//colocamos no state para que o React gerencie as atualizações 
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  handleChangeShelf = (e, bookToUpdateShelf) => {
    const shelf = e.target.value;
    bookToUpdateShelf.shelf = shelf;

    this.setState((state) => {
      BooksAPI.update(bookToUpdateShelf, shelf).then(response => {
        bookToUpdateShelf.shelf = shelf;
        const updateBooks = state.books.filter((b) => b.id !== bookToUpdateShelf.id)
        updateBooks.push(bookToUpdateShelf)

        this.setState({
          books: updateBooks
        })

      })
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="app">
        {this.state.showSearchPage === false &&(
          <ListBooks
          books={this.state.books}
          onChangeShelf={this.handleChangeShelf}
          onNavigate={()=>{
            this.setState({showSearchPage: true})
          }}
        />
        )}
        {this.state.showSearchPage === true &&(
        <SearchBooks 
          books={this.state.books}
          onChangeShelf={this.handleChangeShelf}
        />
        )}
        
      </div>
    )
  }
}

export default BooksApp
