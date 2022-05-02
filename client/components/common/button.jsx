export const Button = ({ children, ...other }) => {
  return (
    <button className="default-button" {...other}>
      {children}
    </button>
  );
};
