import { useState } from 'react';
import { Button } from '../common/button';

export const Modal = ({ addBook, closeModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [bookDesc, setBookDesc] = useState('');
  const [bookGenre, setBookGenre] = useState('');
  const [bookReadDate, setBookReadDate] = useState('');
  const [bookRead, setBookRead] = useState(false);

  const search = async (query) => {
    setSearchQuery(query);

    if (query === '') {
      return;
    }

    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10&`;

    fetch(url)
      .then(response => response.json())
      .then(data => setSearchList(data.items));
  }

  const searchMore = async (scroll) => {

    if (scroll.scrollHeight === (scroll.clientHeight + scroll.scrollTop)) {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${searchList.length - 1}&maxResults=10&`;

      fetch(url)
        .then(response => response.json())
        .then(data => setSearchList([...searchList, ...data.items]));
    }
    return;
  }

  const applyBook = async (book) => {
    console.log(book);

    let selectedBook = {
      title : book.volumeInfo.title,
      author : book.volumeInfo.authors[0],
      description : book.volumeInfo.description,
      pages : book.volumeInfo.pageCount,
      pubDate : book.volumeInfo.publishedDate,
      thumbnail : book.volumeInfo.imageLinks.thumbnail,
    }
    setBookAuthor(selectedBook.author);
    setBookDesc(selectedBook.description);
    setBookTitle(selectedBook.title);
    setCurrentBook(selectedBook)
  }

  const add = async () => {

    if (!currentBook) {
      if (bookTitle === '' || bookAuthor === '') {
        return;
      }

      let newBook = {
        title : bookTitle,
        author : bookAuthor,
        description : bookDesc,
        pages : 0,
        pubDate : '',
        thumbnail : '',
        hasRead : bookRead,
      }

      if (bookRead) {
        newBook.dateRead = bookReadDate;
      }
      addBook(newBook);

      setCurrentBook(null);
      setBookAuthor('');
      setBookTitle('');
      setBookDesc('');
      setBookGenre('');
      setBookRead(false);
      setBookReadDate('');

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
    setBookAuthor('');
    setBookTitle('');
    setBookDesc('');
    setBookGenre('');
    setBookRead(false);
    setBookReadDate('');

    return;
  }

  return (
    <>
      <div className='dark-back' onClick={closeModal}>
        <div className="centered-modal">
          <div className="modal-container">
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-title">Add a New Book</div>

              <div className="search-form">
                <div className="search-input">
                  <div>
                    <label htmlFor="bsearch">Start Looking: </label>
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      id="bsearch" 
                      name="bsearch"
                      onChange={(e) => search(e.target.value)}  
                    />
                  </div>

                  <div className="search-list" onScroll={(e) => searchMore(e.currentTarget)}>
                    {searchList &&
                      searchList.map((book) => (
                        <div className="search-results" key={book.volumeInfo.id} onClick={() => applyBook(book)}>
                          <div>
                            {book.volumeInfo.imageLinks &&
                              <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="" />
                            }
                          </div>
                          <div className="name-results">
                            <div>Title: { book.volumeInfo.title }</div>
                            {book.volumeInfo.authors &&
                            <div>Author: { book.volumeInfo.authors[0] }</div>
                            }
                          </div>
                          
                        </div>

                      ))}
                  </div>
                </div>
                
                <div className="book-form">
                  <form>
                    <div className="input-fields">
                      <label htmlFor="btitle">Title:</label>
                      <input 
                        type="text" 
                        id="btitle" 
                        name="btitle"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)} 
                      />

                      <label htmlFor="bauthor">Author:</label>
                      <input 
                        type="text" 
                        id="bauthor" 
                        name="bauthor" 
                        value={bookAuthor}
                        onChange={(e) => setBookAuthor(e.target.value)}
                      />
                        

                      <label htmlFor="bgenre">Genre:</label>
                      <input 
                        type="text" 
                        id="bgenre" 
                        name="bgenre"
                        value={bookGenre}
                        onChange={(e) => setBookGenre(e.target.value)}
  
                      />
                    
                      <label htmlFor="bdescription">Description:</label>
                      <textarea 
                        type="text" 
                        id="bdescription" 
                        name="bdescription" 
                        className="bdisc"
                        value={bookDesc}
                        onChange={(e) => setBookDesc(e.target.value)}
  
                      />
                    
                    </div>
                    
                    <div className="read-form">
                      <div className="rtitle">Have You Read It Yet?</div>
                      
                      <div className="radio-form">
                        <div className="radio-option">
                          <label htmlFor="hasRead">Yes</label>
                          <input 
                            type="radio" 
                            id="hasRead" 
                            name="has_read" 
                            value="Yes"
                            onChange={() => setBookRead(true)} 
                            />
                        </div>
                        
                        <div className="radio-option">
                          <label htmlFor="hasNotRead">No</label>
                          <input 
                            type="radio" 
                            id="hasNotRead" 
                            name="has_read" 
                            value="No"
                            onChange={() => setBookRead(false)} 
                          />
                        </div>
                      </div>
                      
                      {bookRead &&
                      <div className="date-holder">
                        <label htmlFor="rdate">Date Read:</label>
                        <input 
                          type="date" 
                          id="rdate" 
                          name="rdate" 
                          value={bookReadDate}
                          onChange={(e) => setBookReadDate(e.target.value)}
                            />
                      </div>
                      }
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="modal-buttons">
                <Button onClick={closeModal}>Put Back</Button>
                <Button onClick={() => add()}>Add to Shelf</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};