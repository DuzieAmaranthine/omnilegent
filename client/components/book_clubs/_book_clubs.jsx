import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { BcHeader } from './bcHeader';
import { ClubBox } from './clubBox';
import { DisplayBox } from '../common/displayBox';
import { BcModal } from './bcModal';
import { AddClub } from './add_club';

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
    const allClubs = await api.get('/chat_rooms');
    const joinedClubs = await api.get('/current_rooms');

    console.log(joinedClubs);

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
    const deleted = await api.del(`/chat_rooms/${roomId}`);

    if (deleted.success) {
      setMyClubs(myClubs.filter((rooms) => rooms.id !== roomId));
      setClubs(clubs.filter((rooms) => rooms.id !== roomId));
    }

    return;
  };

  const joinRoom = async (roomId) => {

    for (let i = 0; i < myClubs.length; i++) {
      if (roomId === myClubs[i].id) {
        return;
      }
    }
    const room = await api.post(`/join_room/${roomId}`);

    setMyClubs([...myClubs, room.room]);
    setClubs(clubs.filter((rooms) => rooms.id !== room.id));

    return;
  };

  const quitRoom = async (roomId) => {
    const quit = await api.del(`/quit_room/${roomId}`);

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
        {openModal && <BcModal addClub={createRoom} closeModal={() => setOpenModal(false)}></BcModal>}
        <BcHeader header={'Book Clubs'} logout={logout}></BcHeader>
        <div className='add-button-holder'>
          <AddClub open={() => setOpenModal(true)}></AddClub>
        </div>
        <div className="box-holder">
          <div className="box">
            <ClubBox
            joined={true}
            quitRoom={quitRoom}
            roomList={myClubs}
            ></ClubBox>
          </div>

          <div className="box">
            <ClubBox
              joined={false}
              joinRoom={joinRoom}
              roomList={clubs}
              ></ClubBox>
          </div>
        </div>
    </div>
  );
};
