import { useNavigate } from "react-router";

export const BcHeader =({ logout, header, topic, meeting }) => {
  const navigate = useNavigate();
  return(
    <div>
      <div className="bc-header">
        <div className="bc-title">
          <h1>{ header }</h1>
          {topic && 
            <h3 className="bc-subtitle">{ `Meets : ${meeting}` }</h3>
          }
        </div>
        {meeting && 
          <div className="bc-subsubtitle">{ topic  }</div>
        }
      </div>
        
      <div className="bc-nav-bar">
        <button className="big-nav" onClick={() => navigate(`../`)}>Home</button>
        <button className="big-nav" onClick={() => navigate(`../tbrList`)}>TBR List</button>
        <button className="big-nav" onClick={() => navigate(`../library`)}>My Library</button>
        <button className="big-nav" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}