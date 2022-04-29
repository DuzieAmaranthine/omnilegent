import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const BcHeader =({ logout, header }) => {
  const navigate = useNavigate();
  return(
    <div>
      <div className="bc-header">
        <h1 className="bc-title">{ header }</h1>
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