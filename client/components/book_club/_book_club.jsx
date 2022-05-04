import { set } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { AuthContext } from '../../utils/auth_context';
import { RolesContext } from '../../utils/roles_context';
import { useMessages } from '../../utils/use_message';
import { ChatHeader } from './chatHeader';
import { MembersBar } from './members_bar';
import { MessageBox } from './message_box';

export const BookClub = () => {
  const [, setAuthToken] = useContext(AuthContext);
  const api = useContext(ApiContext);
  const roles = useContext(RolesContext);
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);  
  const [club, setClub] = useState(null);
  const [contents, setContents] = useState('');
  const [messages, sendMessages] = useMessages(club);

  useEffect(async () => {
    setLoading(true);
    if (!user) {
      const { user } = await api.get('/users/me');
      setUser(user)
    }
    const club = await api.get(`/chat_rooms/${id}`);
    setClub(club.room);
    setLoading(false);
  }, [id]);

  const logout = async () => {
    const res = await api.del('/sessions');
    if (res.success) {
      setAuthToken(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }

  const send = async() => {
    if (contents === '') {
      return;
    }

    sendMessages(contents, user);
    setContents('');
  };


  return (
    <div>
      <div className='club-container'>
        <MembersBar club={club} user={user}></MembersBar>

        <div className='chat-container'>
          <ChatHeader 
            logout={logout} 
            header={club.title} 
            topic={club.currentTopic ? club.currentTopic : null} 
            meeting={ club.meetingTime ? club.meetingTime : null}
          ></ChatHeader>

          <div className='messages-container'>
            {messages.length > 0 && 

            messages.map((message) => (
              <MessageBox 
                contents={message.contents} 
                user={message.user} 
                currentUser={user}
              ></MessageBox>
            ))}

          </div>

          <div className='text-container'>
            <textarea value={contents} placeholder={`Send Message...`} onChange={(e) => setContents(e.target.value)}></textarea>
            <button className='chat-button' onClick={() => send()}>Send</button>
          </div>

        </div>

      </div>


    </div>
  )
}