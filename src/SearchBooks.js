import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,//aqui falo que minha prop books precisa ser um array
        onChangeShelf: PropTypes.func.isRequired,//e aqui que a onChangeShelf seja uma função
    }

    state = {
        query: '',
        result: [],
    }

    handleSearch = (query) => {
        this.setState({ query });
        if (query.trim().length) {
            BooksAPI.search(query.trim()).then((result) => {
                this.setState({ result })
            })
        }
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    render() {
        const { onChangeShelf, books } = this.props
        const { query, result } = this.state

        let showingBooks

        if (this.state.query) {
            showingBooks = result.error ? result.items : result;
        } else {
            showingBooks = books
        }

        return (
            <div className="list-books">
                <div className="list-books-title-search">
                    <h1>Search</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className='search-books-bar'>
                            <Link className='close-search' to="/">Close</Link>
                            <input
                                className='search-books-bar'
                                type='text'
                                placeholder='Search new books'
                                value={query}
                                onChange={(event) => this.handleSearch(event.target.value)}
                            />
                        </div>

                        {showingBooks.length !== books.length && (
                            <div className='showing-contacts'>
                                <span>Now showing {showingBooks.length} of {books.length} total</span>
                                <button onClick={this.clearQuery}>Show all</button>
                            </div>
                        )}

                        <div className="bookshelf">
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {showingBooks && showingBooks.map(book => (
                                        <li key={book.id}>
                                            <Book
                                                imageLinks={book.imageLinks}
                                                thumbnail={book.imageLinks.thumbnail}
                                                onChange={(e) => onChangeShelf(e, book)}
                                                shelf={book.shelf}
                                                title={book.title}
                                                authors={book.authors}
                                            />
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default SearchBooks