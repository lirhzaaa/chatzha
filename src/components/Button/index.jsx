const Button = (props) => {
  const {
    children,
    textColor,
    bgColor,
    width,
    height,
    position,
    padding,
    borderRadius,
    type = "button",
    className = "",
    onClick = () => {},
  } = props;
  return (
    <button
      className={`${position} text-${textColor} ${bgColor} ${width} ${height} ${padding} ${borderRadius} ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
