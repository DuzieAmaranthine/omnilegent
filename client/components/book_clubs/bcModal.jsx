import { useState } from 'react';
import { Button } from '../common/button';

export const BcModal = ({ addBook, closeModal }) => {
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
              <div className="modal-title">Create a New Book Club</div>

              <div className="search-form">
                <div className="book-form">
                  <form>
                    <div className="input-fields">
                      <label htmlFor="btitle">Club Name:</label>
                      <input 
                        type="text" 
                        id="btitle" 
                        name="btitle"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)} 
                      />

                      <label htmlFor="bauthor">Meeting Time:</label>
                      <input 
                        type="text" 
                        id="bauthor" 
                        name="bauthor" 
                        value={bookAuthor}
                        onChange={(e) => setBookAuthor(e.target.value)}
                      />
                        

                      <label htmlFor="bgenre">Current Topic:</label>
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
                  </form>
                </div>
              </div>
              
              <div className="modal-buttons">
                <Button onClick={closeModal}>Cancel</Button>
                <Button onClick={() => add()}>Create</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};