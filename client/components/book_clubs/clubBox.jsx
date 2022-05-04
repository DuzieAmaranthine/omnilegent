import { useNavigate } from "react-router"

export const ClubBox = ({ joined, joinRoom, quitRoom, roomList }) => {
  const navigate = useNavigate();

  return(
    <div className="box">
      <div className="box-title">{joined ? 'Joined Clubs' : 'Available Clubs'}</div>

      {roomList.length === 0 && joined && 
        <div>You have not joined any rooms</div> 
      }
      
      {roomList.length === 0 && !joined &&
        <div>There are no rooms to join right now</div>
      }

      {roomList.length > 0 &&
      roomList.map((room) => (
        <div key={room.id} className="box-display">
          <div className="list-display">
            <div>
              <div>{ room.title }</div>
              {room.meetingTime && <div>{ room.meetingTime }</div> }
            </div>
            <div>
              {joined && <button className="default-button" onClick={() => navigate(`../bookclub/${room.id}`)}>Enter</button> }
              {joinRoom && <button className="default-button" onClick={() => joinRoom(room.id)}>Join</button>}
              {quitRoom && <button className="default-button" onClick={() => quitRoom(room.id)}>Leave</button> }
            </div>

          </div>
          
        </div>
      ))}

    </div>
  )
}