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
              <div className="search-input">
                <form>
                  <label for="bsearch">Start Looking: </label>
                  <input type="search" placeholder="Search..." id="bsearch" name="bsearch" />
                </form>
              </div>
              
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
                  
                  <div className="read-form">
                    <span>Have You Read It Yet?</span>
                    
                    <div className="radio-form">
                      <div className="radio-option">
                        <label for="hasRead">Yes</label>
                        <input type="radio" id="hasRead" name="has_read" value="Yes" />
                      </div>
                      
                      <div className="radio-option">
                        <label for="hasNotRead">No</label>
                        <input type="radio" id="hasNotRead" name="has_read" value="No" />
                      </div>
                    </div>
                    
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