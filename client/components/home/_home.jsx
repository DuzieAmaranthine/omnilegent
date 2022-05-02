import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { HomeHeader } from '../common/homeHeader';
import { DisplayBox } from '../common/displayBox';
import { Sort } from '../common/sort';
import * as dotenv from 'dotenv';
dotenv.config();

export const Home = () => {
  const bookKey = process.env.REACT_APP_BOOK_KEY;

  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [tbrList, setTbrList] = useState([]);
  const [library, setLibrary] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState(null);
  
  useEffect(async () => {
    // const search = await api.get(`openlibrary.org/search.json?q=the+lord+of+the+rings`);
    const res = await api.get('/users/me');
    const tbr = await api.get('/books_to_read');
    const lib = await api.get('/books_read');
    // const clubs = await api.get('/current_rooms');
    const clubs = await api.get('/chat_rooms');

    fetch(`https://www.googleapis.com/books/v1/volumes?q=stephenking&maxResults=10&`)
      .then(response => response.json())
      .then(data => setSearch(data));

    console.log(clubs);
    console.log(bookKey);

    setTbrList(tbr.books);
    setLibrary(lib.books);
    setClubs(clubs.rooms);
    
    setUser(res.user);
    setLoading(false);
  }, []);

  useEffect(async () =>{
    console.log(search.items);
    
  }, [search])

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
      <HomeHeader logout={ logout }></HomeHeader>
      <div className="box-holder">
        <DisplayBox
        header="TBR List"
        list={tbrList}
        emptyMessage="Add Books to your To Be Read List"
        ></DisplayBox>
        <DisplayBox
        header="Library"
        list={library}
        emptyMessage="Add Books to your Virtual Library"
        ></DisplayBox>
        <DisplayBox
        header="Book Clubs"
        list={clubs}
        emptyMessage="Start or Join a Book Club"
        ></DisplayBox>
      </div>
    </div>
  );
};
