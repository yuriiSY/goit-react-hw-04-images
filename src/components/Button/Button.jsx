const Button = ({ type = 'submit', children, onClick }) => {
  return (
    <button className="Button" onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
