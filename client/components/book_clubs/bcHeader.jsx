import { useNavigate } from "react-router";

export const BcHeader =({ logout, header }) => {
  const navigate = useNavigate();
  return(
    <div>
      <div className="bc-header">
        <h1 className="bc-title">{header}</h1>
        <h2 className="bc-subtitle">Omnilegent: (adj) reading or having read everything</h2>
      </div>
      <div className="bc-nav-bar">
        <button className="bc-nav" onClick={() => navigate('../')}>Home</button>
        <button className="bc-nav" onClick={() => navigate(`../tbrList`)}>TBR List</button>
        <button className="bc-nav" onClick={() => navigate(`../library`)}>My Library</button>
        <button className="bc-nav" onClick={logout}>Logout</button>
      </div>
    </div>
  )
}