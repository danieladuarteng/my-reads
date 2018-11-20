import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import logo from './images/logo.png'
import add from './icons/add.svg'
import BookShelf from './BookShelf'

const shelves = [
    {
        title: 'Currently Reading',
        shelf: 'currentlyReading',
    },
    {
        title: 'Want To Read',
        shelf: 'wantToRead',
    },
    {
        title: 'Read',
        shelf: 'read',
    },
];

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
                            <h1>Search new books</h1>
                        </div>
                    </Link>
                </div>

                {shelves.map(item => (
                    <BookShelf
                        key={item.title}
                        books={books}
                        title={item.title}
                        shelf={item.shelf}
                        onChangeShelf={onChangeShelf}
                    />
                ))}

                <footer>Project Udacity My Reads - Developed by
                    <a
                        href="https://github.com/danieladuarteng"
                        alt="GitHub of Daniela Duarte"
                        target="_blank"
                        rel="noopener noreferrer"
                    >Daniela Duarte - GitHub
                    </a>
                </footer>
            </div>
        )
    }
}

export default ListBooks