import { useState } from 'react';
import { Button } from '../common/button';

export const Modal = ({ }) => {
  const [searchList, setSearchList] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);

  const search = async (query) => {

    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=50&`

    fetch(url)
      .then(response => response.json())
      .then(data = setSearchList(data.items));
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
                  <label for="btitle">Title:</label>
                  <input type="text" id="btitle" name="btitle" />

                  <label for="bauthor">Author:</label>
                  <input type="text" id="bauthor" name="bauthor" />

                  <label for="bgenre">Genre:</label>
                  <input type="text" id="bgenre" name="bgenre" />

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