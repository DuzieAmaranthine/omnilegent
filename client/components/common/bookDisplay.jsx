export const BookDisplay =({ book }) => {

  return(
    <div className="book-display">
      <div className="thumb-display">
        {book.thumbnail && <img src={book.thumbnail} alt=''/>}
        {book.hasRead === true && <div>{book.dateRead}</div>}
      </div>
      <div className="info-display">
        <div>Title: {book.title}</div>
        <div>Author: {book.author}</div>
        <div>Description: {book.description}</div>
      </div>      
    </div>
  )
}