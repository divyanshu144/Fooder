import { cx } from "./utils";

const Button = ({
  className,
  children,
  variant = "primary",
  size = "md",
  ...props
}) => {
  const variants = {
    primary: "bg-black text-white hover:bg-gray-900",
    secondary: "bg-white text-gray-900 border border-black/10 hover:bg-gray-100",
    outline: "border border-gray-200 text-gray-800 hover:bg-gray-50",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };

  return (
    <button
      className={cx(
        "rounded-full font-semibold transition shadow-sm",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
