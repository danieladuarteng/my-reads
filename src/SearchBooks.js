import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { debounce } from 'lodash'

class SearchBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,//aqui falo que minha prop books precisa ser um array
        onChangeShelf: PropTypes.func.isRequired,//e aqui que a onChangeShelf seja uma função
    }

    state = {
        query: '',
        result: [],
        isValid: true,
    }

    search(query) {
        this.setState({ query });
        if (query.trim().length) {
            BooksAPI.search(query.trim()).then((response) => {
                let search = response.map(currentBook => {
                    let existingBook = this.props.books.find(book => book.id === currentBook.id)
                    if (existingBook) {
                        currentBook.shelf = existingBook.shelf
                    } else {
                        currentBook.shelf = 'none'
                    }
                    return currentBook;
                })
                this.setState({ result: search })
            }).catch((err) => {
                this.setState({
                    result: [],
                    isValid: false
                })
            })
        } else {
            console.log('Empty')
            this.setState({
                result: [],
                isValid: true
            })
        }
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    render() {
        const { onChangeShelf, books } = this.props
        const { query, result, isValid } = this.state

        let showingBooks

        if (this.state.query) {
            showingBooks = result.error ? result.items : result;
        } else {
            showingBooks = books
        }

        console.log(isValid)

        return (
            <div className="list-books" >
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
                                onChange={(event) => this.search(event.target.value)}
                            />
                        </div>

                        {(isValid === true && showingBooks.length > 0) && (
                            <div className='showing-contacts'>
                                <span>Now showing {showingBooks.length}</span>
                                <button onClick={this.clearQuery}>Show all</button>
                            </div>
                        )}

                        {isValid === false && (
                            <div className='showing-contacts'>
                                <span>We didn't find anything</span>
                                <span>Please try again with words: 'Android', 
                                    'Art', 'Artificial Intelligence', 'Astronomy', 
                                    'Austen', 'Baseball', 'Basketball', 'Bhagat', 
                                    'Biography', 'Brief', 'Business', 'Camus', 
                                    'Cervantes', 'Christie', 'Classics', 'Comics', 
                                    'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 
                                    'Development', 'Digital Marketing', 'Drama', 
                                    'Drawing', 'Dumas', 'Education', 'Everything', 
                                    'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 
                                    'Football', 'Future', 'Games', 'Gandhi', 'Homer', 
                                    'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 
                                    'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 
                                    'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 
                                    'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 
                                    'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 
                                    'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 
                                    'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 
                                    'Web Development', 'iOS'</span>
                                
                            </div>
                        )}


                        <div className="bookshelf">
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {showingBooks && showingBooks.map((book) => (
                                        <li key={book.id}>
                                            <Book
                                                imageLinks={book.imageLinks}
                                                thumbnail={book.imageLinks.thumbnail} 
                                                onChange={(e) => onChangeShelf(e, book)}
                                                shelf={book.shelf}
                                                title={book.title || ''}
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