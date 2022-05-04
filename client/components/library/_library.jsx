import { useContext, useEffect, useState } from "react";
import { Modal } from "../common/modal";
import { AddBook } from "../common/addBook";
import { BookDisplay } from "../common/bookDisplay";
import { ApiContext } from "../../utils/api_context";
import { AuthContext } from "../../utils/auth_context";
import { RolesContext } from "../../utils/roles_context";
import { useNavigate } from "react-router";
import { LibHeader } from "./libHeader";
import { LibraryBookDisplay } from "./libraryBookDisplay";

export const Library = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [library, setLibrary] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(async () => {
    const res = await api.get('/users/me');
    const libList = await api.get('/books_read')

    setLibrary(libList.books);
    setUser(res.user);
    setLoading(false);
  }, []);

  const addBook = async (book) => {
    const newBook = await api.post('/books', book);

    if (book.hasRead) {
      setLibrary([...library, newBook.book]);
    }
  };

  const deleteBook = async (book) => {
    const deleteBook = await api.del(`/books/${book.id}`);

    if (deleteBook.success) {
      const newLib = library.filter((books) => books.id !== book.id);
      setLibrary(newLib);
    }
    return;
  };

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {openModal && <Modal addBook={addBook} closeModal={() => setOpenModal(false)}></Modal>}
      <div>
        <LibHeader header={'My Library'} logout={logout}></LibHeader>
        
        <div className='add-button-holder'>
          <AddBook open={() => setOpenModal(true)}></AddBook>
        </div>

        <div className="bookshelf">
          {library.length > 0 &&
            library.map((book) => (
              <LibraryBookDisplay 
                book={book}
                deleteBook={deleteBook}
              ></LibraryBookDisplay>
            ))}
        </div>
      </div>
    </div>
  )
}