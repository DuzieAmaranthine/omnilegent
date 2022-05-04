export const MessageBox = ({contents, user, currentUser}) => {

  return (
    <div className="message-container">
      <div className="message-display">
        <div className="user-display">
          <div className="un">
            {user} Username
          </div>
          said: 
        </div>
        {contents}
      </div>
    </div>
  );
}