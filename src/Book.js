import React from 'react'

class Book extends React.Component {
    render() {
        const {  onChange, shelf, title } = this.props;

        let { imageLinks, authors, thumbnail } = this.props;
        let bookCover;
        if (typeof imageLinks === 'undefined') {
            bookCover = ''
          } else {
            bookCover = thumbnail;
          }

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128, height: 193,
                        backgroundImage: `url(${bookCover})`
                    }}></div>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={onChange}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors-want">{authors}</div>
            </div>
        )
    }
}

export default Book