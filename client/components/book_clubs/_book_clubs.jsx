import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { BcHeader } from '../common/bcHeader';
import { DisplayBox } from '../common/displayBox';

export const BookClubs = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [myClubs, setMyClubs] = useState([]);
  const [clubs, setClubs] = useState([]);

  useEffect(async () => {
    const res = await api.get('/users/me');
    const allClubs = await api.get('/chat_rooms');
    const joinedClubs = await api.get('/chat_rooms/user/');

    setClubs(allClubs.rooms);
    setMyClubs(joinedClubs.rooms);
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
    <div>
      <BcHeader logout={logout} header={'My Book Clubs'}></BcHeader>
    </div>
  );
};
