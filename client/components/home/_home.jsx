import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { HomeHeader } from '../common/homeHeader';
import { DisplayBox } from '../common/displayBox';
import { Sort } from '../common/sort';

export const Home = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [tbrList, setTbrList] = useState([]);
  const [library, setLibrary] = useState([]);
  const [clubs, setClubs] = useState([]);
  
  useEffect(async () => {
    const res = await api.get('/users/me');
    const tbr = await api.get('/books_to_read');
    const lib = await api.get('/books_read');
    // const clubs = await api.get('/current_rooms');
    const clubs = await api.get('/chat_rooms');

    console.log(clubs);

    setTbrList(tbr.books);
    setLibrary(lib.books);
    setClubs(clubs.rooms);
    
    setUser(res.user);
    setLoading(false);
  }, []);

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
    <div className="p-4">
      <HomeHeader logout={ logout }></HomeHeader>
      <div className="box-holder">
        <DisplayBox
        header="TBRList"
        list={tbrList}
        emptyMessage="Start Looking!"
        ></DisplayBox>
        <DisplayBox
        header="Library"
        list={library}
        emptyMessage="Start Reading!"
        ></DisplayBox>
        <DisplayBox
        header="Book Clubs"
        list={clubs}
        emptyMessage="Join a Club!"
        ></DisplayBox>
      </div>
    </div>
  );
};
