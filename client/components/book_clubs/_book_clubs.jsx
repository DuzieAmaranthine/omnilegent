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
  const [openModal, setOpenModal] = useState(false);

  useEffect(async () => {
    const res = await api.get('/users/me');
    const allClubs = await api.get('/available_rooms');
    const joinedClubs = await api.get('/chat_rooms/user');

    setClubs(allClubs.rooms);
    setMyClubs(joinedClubs.rooms);
    setUser(res.user);
    setLoading(false);
  }, []);

  const createRoom = async (room) => {
    const newRoom = await api.post('/chat_rooms', room);
    setMyClubs([...myClubs, newRoom.newRoom]);

    return;
  };

  const deleteRoom = async (roomId) => {
    const deleted = await api.delete(`/chat_rooms/${roomId}`);

    if (deleted.success) {
      setMyClubs(myClubs.filter((rooms) => rooms.id !== roomId));
      setClubs(clubs.filter((rooms) => rooms.id !== roomId));
    }

    return;
  };

  const joinRoom = async (roomId) => {
    const room = await api.post(`/join_room/${roomId}`);

    setMyClubs([...myClubs, room]);
    setClubs(clubs.filter((rooms) => rooms.id !== room.id));

    return;
  };

  const quitRoom = async (roomId) => {
    const quit = await api.delete(`/quit_room/${roomId}`);

    if (quit.success) {
      setMyClubs(myClubs.filter((rooms) => rooms.id !== roomId));
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BcHeader logout={logout} header={'My Book Clubs'}></BcHeader>
    </div>
  );
};
