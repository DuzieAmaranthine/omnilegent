import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const SmallHeader =({ home, logout }) => {
  const navigate = useNavigate();
  return(
    <div>
      <div className="small-header">
        <h1 className="title2">TBR List</h1>
        <h2>Omnilegent: (adj) reading or having read everything</h2>
      </div>
      <div className="small-nav-bar">
        <Link to='/'><button className="small-nav">Home</button></Link>
        <button className="small-nav" onClick={() => navigate(`../library`)}>My Library</button>
        <button className="small-nav" onClick={() => navigate(`../bookClubs`)}>Book Clubs</button>
        <button className="small-nav" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}