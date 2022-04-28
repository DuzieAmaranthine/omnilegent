import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const BcHeader =({ home, logout }) => {
  const navigate = useNavigate();
  return(
    <div>
      <div className="bc-header">
        <h1 className="bc-title">It's Not Ready Yet...</h1>
        <h2>Meets: The 3rd Wednesday, Monthly</h2>
      </div>
      <div className="bc-nav-bar">
        <button className="bc-nav" onClick={home}>Home</button>
        <button className="bc-nav" onClick={() => navigate(`tbrList`)}>TBR List</button>
        <button className="bc-nav" onClick={() => navigate(`library`)}>My Library</button>
        <button className="bc-nav" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}