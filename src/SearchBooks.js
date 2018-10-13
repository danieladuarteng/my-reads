import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class SearchBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,//aqui falo que minha prop books precisa ser um array
        onChangeShelf: PropTypes.func.isRequired,//e aqui que a onChangeShelf seja uma função
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    clearQuery = () =>{
        this.setState({ query: ''})
    }

    render() {
        const {books, onChangeShelf} = this.props
        const {query}  = this.state

        let showingBooks
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingBooks = books.filter((book) => match.test(book.title))

        } else {
            showingBooks = books
        }

        showingBooks.sort(sortBy('title'))//exibe em ordem alfabética

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>Search</h1>
                </div>

                <div className="list-books-content">
                    <div>
                        <div class='search-books-bar'>
                            <input
                                className='search-books-bar'
                                type='text'
                                placeholder='Search new books'
                                value={query}
                                onChange={(event) => this.updateQuery(event.target.value)}
                            />
                        </div>

                        {showingBooks.length !== books.length && (
                            <div>
                                <span>Now showing {showingBooks.length} of {books.length} total</span>
                                <button  onClick={this.clearQuery}>Show all</button>
                            </div>
                        )}
                        <div className="bookshelf">

                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {showingBooks.map(book => (
                                        <li key={book.title}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{
                                                        width: 128, height: 193,
                                                        backgroundImage: `url(${book.cover})`
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