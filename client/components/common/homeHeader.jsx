import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const HomeHeader =({ logout, home }) => {
  const navigate = useNavigate();
  return(
    <div>
      <div className="big-header">
        <h1>omnilegent:</h1>
        <h2>(adj) reading or having read everything</h2>
      </div>
      <div className="nav-bar">
        <button className="big-nav">TBR list</button>
        <button className="big-nav">My Library</button>
        <button className="big-nav">Book Clubs</button>
        <button className="big-nav" onClick={logout}>logout</button>
      </div>
    </div>
  )
}