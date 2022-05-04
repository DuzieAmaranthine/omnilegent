export const LibraryBookDisplay =({ book }) => {

  return(
    <div className="book-display">
      <div className="book-info-holder">
        <div className="thumb-display">
          {book.thumbnail && <img src={book.thumbnail} alt=''/>}
          <div className="date-read">Date Read: 
            {book.hasRead === true && <div>{book.dateRead}</div>}
          </div>
          <div className="library-button-holder">
            <button className="book-delete">Delete</button>
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