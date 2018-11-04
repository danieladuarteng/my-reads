import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {//colocamos no state para que o React gerencie as atualizações 
    books: [],
  }

  async componentDidMount() {//deixa de forma assincrona
    const books = await BooksAPI.getAll()//fala para esperar até pegar todos os dados
      this.setState({ books })
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
    return (
      <div className="app">
        <Route exact path="/" e render={() => (
          <ListBooks
            books={this.state.books}
            onChangeShelf={this.handleChangeShelf}
          />
        )} />

        <Route path="/search" render={() => (
          <SearchBooks
            books={this.state.books}
            onChangeShelf={this.handleChangeShelf}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
