import { useNavigate } from "react-router";

export const LibHeader =({ logout, header }) => {
  const navigate = useNavigate();
  return(
    <div>
      <div className="lib-header">
        <h1 className="lib-title">{header}</h1>
        <h2>Omnilegent: (adj) reading or having read everything</h2>
      </div>
      <div className="lib-nav-bar">
        <button className="lib-nav" onClick={() => navigate('../')}>Home</button>
        <button className="lib-nav" onClick={() => navigate(`../tbrList`)}>TBR List</button>
        <button className="lib-nav" onClick={() => navigate(`../bookClubs`)}>Book Clubs</button>
        <button className="lib-nav" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}