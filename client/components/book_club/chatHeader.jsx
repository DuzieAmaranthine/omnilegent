import { useNavigate } from "react-router";

export const ChatHeader =({ logout, header, topic, meeting }) => {
  const navigate = useNavigate();
  return(
    <div>
      <div className="c-header">
        <div className="c-title">
          <h1>{ header }</h1>
          {topic && 
            <h2 className="c-subtitle">{ `Meets : ${meeting}` }</h2>
          }
        </div>
        {meeting && 
          <div className="c-subsubtitle">{ topic  }</div>
        }
      </div>
        
      <div className="chat-nav-bar">
        <button className="chat-nav" onClick={() => navigate(`../`)}>Home</button>
        <button className="chat-nav" onClick={() => navigate(`../tbrList`)}>TBR List</button>
        <button className="chat-nav" onClick={() => navigate(`../library`)}>My Library</button>
        <button className="chat-nav" onClick={() => navigate(`../bookClubs`)}>Book Clubs</button>
        <button className="chat-nav" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}