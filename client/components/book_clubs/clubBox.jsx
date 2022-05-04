import { useNavigate } from "react-router"

export const ClubBox = ({ joined, joinRoom, quitRoom, roomList }) => {
  const navigate = useNavigate();

  return(
    <div>
      <div className="club-title">{joined ? 'Joined Clubs' : 'Available Clubs'}</div>
        {roomList.length === 0 && joined && 
          <div>You Have Not Joined a Club Yet!</div> 
        }

        {roomList.length === 0 && !joined &&
          <div>There are No Clubs to Join, Why Don't You Start One?</div>
        }

        <div className="bc-box-display">
          {roomList.length > 0 &&
          roomList.map((room) => (
            <div className="box-display" key={room.id}>
              <div key={room.id}>
                <div className="list-display">
                  <div>
                    <div className="book-club-title">{ room.title }</div>
                    {room.meetingTime && <div className="meeting-time">Meets: { room.meetingTime }</div> }
                  </div>
                  <div className="bc-button-holder">
                    {joined && <button className="default-button" onClick={() => navigate(`../bookclub/${room.id}`)}>Enter</button> }
                    {joinRoom && <button className="default-button" onClick={() => joinRoom(room.id)}>Join</button>}
                    {quitRoom && <button className="default-button" onClick={() => quitRoom(room.id)}>Leave</button> }
                  </div>

                </div>
              </div>
            </div>
            ))}
        </div>

    </div>
  )
}