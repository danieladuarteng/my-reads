import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
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
                <div className="list-books-title">
                    <h1>Search</h1>
                </div>

                <div className="list-books-content">

                    <div>
                    <Link className='close-search' to="/">Close</Link>
                        <div className='search-books-bar'>
                            
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
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{
                                                        width: 128, height: 193,
                                                        backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`
                                                    }}></div>
                                                    <div className="book-shelf-changer">
                                                        <select value={book.shelf} onChange={(e) => onChangeShelf(e, book)}>
                                                            <option value="move" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="book-title">{book.title}</div>
                                                <div className="book-authors">{book.authors}</div>
                                            </div>
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