export const MessageBox = ({contents, user, currentUser}) => {

  return (
    <div className="message-container">
      <div>{contents}</div>
      <div>{user}</div>
    </div>
  );
}