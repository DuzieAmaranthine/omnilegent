export const MessageBox = ({ message, actionClick }) => {
  return (
    <div className="message-box">
      <div onClick={() => actionClick()}>{message}</div>
    </div>
  );
}