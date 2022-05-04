export const BookDisplay =({ book, deleteBook, finishBook }) => {

  return(
    <div className="book-display">
      <div className="book-info-holder">
        <div className="thumb-display">
          {book.thumbnail && <img src={book.thumbnail} alt=''/>}
          {book.hasRead === true && <div>{book.dateRead}</div>}
          <div className="tbr-button-holder">
            <button className="book-delete" onClick={() => deleteBook(book)}>Delete</button>
            <button className="tbr-to-read" onClick={() => finishBook(book)}>Finished</button>
          </div>
        </div>
        <div className="info-display">
          <div>Title: {book.title}</div>
          <div>Author: {book.author}</div>
          <div>Description: {book.description}</div>
        </div>   
      </div>
    </div>
  )
}