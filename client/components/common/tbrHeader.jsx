import { useNavigate } from "react-router";

export const TbrHeader =({ logout, header }) => {
  const navigate = useNavigate();
  return(
    <div>
      <div className="tbr-header">
        <h1 className="tbr-title">{header}</h1>
        <h2>Omnilegent: (adj) reading or having read everything</h2>
      </div>
      <div className="tbr-nav-bar">
        <button className="tbr-nav" onClick={() => navigate('../')}>Home</button>
        <button className="tbr-nav" onClick={() => navigate(`../library`)}>My Library</button>
        <button className="tbr-nav" onClick={() => navigate(`../bookClubs`)}>Book Clubs</button>
        <button className="tbr-nav" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}