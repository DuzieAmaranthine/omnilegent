import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { useMessages } from '../../utils/use_message';
import { usePost } from '../../utils/use_post';
import { BcHeader } from '../book_clubs/bcHeader';
import { ChatColumn } from '../common/chatColumn';
import { ChatHeader } from './chatHeader';
import { MembersBar } from './members_bar';
import { MessageBox } from './message_box';
import { UserOverview } from './user_overview';
import { ClubModal } from './club_Modal';

export const BookClub = () => {

  const api = useContext(ApiContext);
  const navigate = useNavigate();

  // Initial states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookClub, setBookClub] = useState(null);
  const [bookClubs, setBookClubs] = useState([]);
  const [availableClubs, setAvailableClubs] = useState([]);
  
  // Book club creation states
  const [bookClubModal, setBookClubModal] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(async () => {
    const user = await api.get('/users/me');
    setUser(user);
    setLoading(true);
  }, []);

  useEffect(async () => {
    if (user) {
      const bookClubs = await api.get('/current_clubs');
      const availableClubs = await api.get('/available_clubs');
      setBookClubs(bookClubs);
      setAvailableClubs(availableClubs);
      setLoading(false);
      console.log(bookClubs);
    }
  }, [user]);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
      navigate('/');
    }
  }

  const addClub = async (bookClub) => {
    const newClub = await api.post('/book_clubs', bookClub);
    setBookClubs([...bookClubs, newClub]);
    setBookClubModal(false);
    setSuccess(true);
    return;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='book-club'>
      {bookClubModal && (<ClubModal addClub={addClub} close={() => setBookClubModal(false)}></ClubModal>)}

      <BcHeader header={'Book Clubs'} logout={logout}></BcHeader>

      <div className='row-box'>
        <UserOverview
        currentBookClub={bookClub}
        setCurrentBookClub={setBookClub}
        clubList={bookClubs}
        setCLubList={setBookClubs}
        availableClubs={availableClubs}
        setAvailableClubs={setAvailableClubs}
        user={user}
        openBookClubModal={setBookClubModal}
        ></UserOverview>

        <ChatColumn
        currentBookClub={bookClub}
        user={user}
        loading={loading}
        ></ChatColumn>

      </div>
    </div>
  )

  // const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState(null);  
  // const [club, setClub] = useState(null);
  // const [contents, setContents] = useState('');
  // const [messages, sendMessages] = useMessages(club);

  // useEffect(async () => {
  //   setLoading(true);
  //   if (!user) {
  //     const { user } = await api.get('/users/me');
  //     setUser(user)
  //   }
  //   const club = await api.get(`/chat_rooms/${id}`);
  //   setClub(club.room);
  //   setLoading(false);
  // }, [id]);

  // const logout = async () => {
  //   const res = await api.del('/sessions');
  //   if (res.success) {
  //     setAuthToken(null);
  //   }
  // };

  // if (loading) {
  //   return <div>Loading...</div>
  // }

  // const send = async() => {
  //   if (contents === '') {
  //     return;
  //   }

  //   sendMessages(contents, user);
  //   setContents('');
  // };


  // return (
  //   <div>
  //     <div className="members-header">
  //       <MembersBar club={club} user={user}></MembersBar>

  //       <div className="header-chat">
  //         <ChatHeader 
  //           logout={logout} 
  //           header={club.title} 
  //           topic={club.currentTopic ? club.currentTopic : null} 
  //           meeting={ club.meetingTime ? club.meetingTime : null}
  //         ></ChatHeader>

  //         <div className="chat-container">

  //           <div className="messages-container">
  //             {messages.length > 0 && 

  //             messages.map((message) => (
  //               <MessageBox
  //                 key={message.id}
  //                 contents={message.contents} 
  //                 user={message.userName} 
  //                 currentUser={user}
  //               ></MessageBox>
  //             ))}
  //           </div>

  //           <div className="text-container">
  //             <textarea value={contents} placeholder={`Send Message...`} onChange={(e) => setContents(e.target.value)}></textarea>
  //             <div className="chat-button-holder">
  //               <button className='chat-button' onClick={() => send()}>Send</button>
  //             </div>
  //           </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  // )
}