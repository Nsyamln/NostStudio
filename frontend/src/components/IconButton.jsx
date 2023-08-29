export default function IconButton({
  variant = "filled",
  className,
  ...props
}) {
  return (
    <button
      className={`button icon-button ${
        variant && `button-${variant}`
      } ${className}`}
      {...props}
    />
  );
}
