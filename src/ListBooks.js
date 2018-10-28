import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import logo from './images/logo.png'
import add from './icons/add.svg'

class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,//aqui falo que minha prop books precisa ser um array
        onChangeShelf: PropTypes.func.isRequired,//e aqui que a onChangeShelf seja uma função
    }

    render() {
        const { books, onChangeShelf } = this.props
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <img src={logo} alt="logo" />
                    <Link
                        to="/search"
                        className="link-new-books"
                    >
                        <div className="new-books">
                            <img src={add} alt="add" />
                            <h1>Search new books</h1></div>
                    </Link>
                </div>

                <div className="list-books-content">
                    <div className="bookshelf-reading">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <ol className="books-grid">
                            {books.filter(book => book.shelf === 'currentlyReading').map(book => (
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

                    <div className="bookshelf-want">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <ol className="books-grid">
                            {books.filter(book => book.shelf === 'wantToRead').map(book => (
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
                                        <div className="book-authors-want">{book.authors}</div>
                                    </div>
                                </li>
                            ))}
                        </ol>

                    </div>

                    <div className="bookshelf-read">
                        <h2 className="bookshelf-title">Read</h2>
                        <ol className="books-grid">
                            {books.filter(book => book.shelf === 'read').map(book => (
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
                                                    <option value="none" >None</option>
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
                    <footer>Project Udacity My Reads - Developed by
                            <a
                            href="https://github.com/danieladuarteng"
                            alt="GitHub of Daniela Duarte"
                            target="_blank"
                            rel="noopener noreferrer"
                        >Daniela Duarte - GitHub
                            </a></footer>
                </div>
            </div>
        )
    }
}

export default ListBooks