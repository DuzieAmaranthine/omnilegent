import { Button } from "../common/button"

export const ClubBox = ({ boxKey, boxClub, currentClub, joinClub, leaveClub, onAction }) => {
  return (
    <div className="club-box" onClick={onAction}>
      <div className="club-box-title">{ boxClub.title }</div>

      { currentClub && boxClub.id === currentClub.id & (
        <div>
          <div className="club-box-description">{ boxClub.description }</div>
        
          <div>
          {joinClub && (
            <Button 
              className="gen-button confirm-button"
              onClick={() => joinClub(boxClub.id)}
            >Join</Button>
          )}
    
          {leaveClub && (
            <Button 
              className="gen-button cancel-button"
              onClick={() => leaveClub(boxClub.id)}
            >Leave</Button>)}
          </div>
        </div>


      )}
      

    </div>
  )
}