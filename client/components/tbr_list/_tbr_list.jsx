import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { SmallHeader } from '../common/smallHeader';
import { BookDisplay } from '../common/bookDisplay';
import { AddBook } from '../common/addBook';
import { Modal } from '../common/modal';

export const TbrList = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [tbrList, setTbrList] = useState([[]]);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const res = await api.get('/users/me');
    const bookList = await api.get('/books_to_read');

    setTbrList(bookList.books);
    setUser(res.user);
    setLoading(false);
  }, []);

  const addBook = async (book) => {
    const newBook = await api.post('/books', book);

    if (!book.hasRead) {
      setTbrList([...tbrList, newbook.newBook]);
    }
  }

  const completeBook = async (book) => {
    const finished = await api.put(`/books/${book.id}`);

    if (finished.success) {
      const newTbr = tbrList.filter((books) => books.id !== book.id);
      setTbrList(newTbr);
      return;
    }
  }

  const deleteBook = async (book) => {
    const deleteBook = await api.delete(`/books/${book.id}`);

    if (deleteBook.success) {
      const newTbr = tbrList.filter((books) => books.id !== book.id);
      setTbrList(newTbr);
      return;
    }
  }

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SmallHeader></SmallHeader>
      <Modal addBook={addBook}></Modal>
      <div className="bookshelf">
        <AddBook></AddBook>
        <BookDisplay></BookDisplay>
      </div>
    </div>
  );
};
