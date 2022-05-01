import { useState } from 'react';
import { Button } from '../common/button';

export const Modal = ({ }) => {

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
                    <input type="text" id="btitle" name="btitle" />

                    <label for="bauthor">Author:</label>
                    <input type="text" id="bauthor" name="bauthor" />

                    <label for="bgenre">Genre:</label>
                    <input type="text" id="bgenre" name="bgenre" />
                  
                    <label for="bdescription">Description:</label>
                    <input type="text" id="bdescription" name="bdescription" className="bdisc" />
                  
                  </div>
                  
                  <div>
                    <span>Have You Read It Yet?</span>
                    
                    <label for="hasRead">Yes</label>
                    <input type="radio" id="hasRead" name="has_read" value="Yes" />

                    <label for="hasNotRead">No</label>
                    <input type="radio" id="hasNotRead" name="has_read" value="No" />
                    
                    <label for="rdate">Date Read:</label>
                    <input type="date" id="rdate" name="rdate" />
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