import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const HomeHeader =({ logout }) => {
  const navigate = useNavigate();
  return(
    <div>
      <div className="big-header">
        <h1 className="title1">omnilegent:</h1>
        <h2 className="home-subtitle">(adj) reading or having read everything</h2>
      </div>
      <div className="nav-bar">
        <button className="big-nav" onClick={() => navigate(`tbrList`)}>TBR List</button>
        <button className="big-nav" onClick={() => navigate(`library`)}>My Library</button>
        <button className="big-nav" onClick={() => navigate(`bookClubs`)}>Book Clubs</button>
        <button className="big-nav" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}