import { useState } from 'react';
import { Button } from '../common/button';

export const Modal = ({ addBook }) => {
  const [searchList, setSearchList] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [bookGenre, setBookGenre] = useState('');
  const [bookReadDate, setBookReadDate] = useState('');
  const [bookRead, setBookRead] = (false);

  const search = async (query) => {

    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=50&`

    fetch(url)
      .then(response => response.json())
      .then(data = setSearchList(data.items));
  }

  const applyBook = async (book) => {

    let selectedBook = {
      title : book.volumeInfo.title,
      author : book.volumeInfo.author[0],
      description : book.volumeInfo.description,
      pages : book.volumeInfo.pageCount,
      pubDate : book.volumeInfo.publishedDate,
      thumbnail : book.volumeInfo.imageLinks.thumbnail,
    }
    setCurrentBook(selectedBook)
  }

  const add = async () => {
    if (!currentBook) {
      return;
    }

    let newBook = currentBook;
    newBook.genre = bookGenre;
    newBook.hasRead = bookRead;

    if (bookRead) {
      newBook.dateRead = bookReadDate;
    }

    addBook(newBook);

    setCurrentBook(null);
    setBookGenre('');
    setBookRead(false);
    setBookReadDate('');

    return;
  }

  return (
    <>
      <div className="overlay">
        <div className="modal-container">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">Add a New Book</div>

            <div className="search-form">
              <div className="search">Search...</div>
              <div className="book-form">
                <form>
                  <div className="input-fields">
                    <label for="btitle">Title:</label>
                    <input 
                      type="text" 
                      id="btitle" 
                      name="btitle"
                      value={currentBook ? currentBook.title : ''} 
                    />

                    <label for="bauthor">Author:</label>
                    <input 
                      type="text" 
                      id="bauthor" 
                      name="bauthor" 
                      value={currentBook ? currentBook.author : ''}
                    />
                      

                    <label for="bgenre">Genre:</label>
                    <input 
                      type="text" 
                      id="bgenre" 
                      name="bgenre"
                      value={bookGenre}
                      onChange={(e) => setBookGenre(e.target.valu)}
 
                    />
                  
                    <label for="bdescription">Description:</label>
                    <input 
                      type="text" 
                      id="bdescription" 
                      name="bdescription" 
                      className="bdisc"
                      value={currentBook ? currentBook.description : ''}
 
                    />
                  
                  </div>
                  
                  <div>
                    <span>Have You Read It Yet?</span>
                    
                    <label for="hasRead">Yes</label>
                    <input 
                      type="radio" 
                      id="hasRead" 
                      name="has_read" 
                      value="Yes"
                      onChange={() => setBookRead(true)} 
                      />

                    <label for="hasNotRead">No</label>
                    <input 
                      type="radio" 
                      id="hasNotRead" 
                      name="has_read" 
                      value="No"
                      onChange={() => setBookRead(false)} 
                    />
                    
                    <label for="rdate">Date Read:</label>
                    <input 
                      type="date" 
                      id="rdate" 
                      name="rdate" 
                      value={bookReadDate}
                      onChange={(e) => setBookReadDate(e.target.value)}
                       />
                  </div>
                </form>
              </div>
            </div>
            
            <div className="modal-buttons">
              <Button>Put Back</Button>
              <Button>Shelve</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};