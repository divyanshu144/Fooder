import { cx } from "./utils";

const Input = ({ className, size = "md", variant = "outline", ...props }) => {
  const sizes = {
    sm: "px-2.5 py-1.5 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base",
  };

  const variants = {
    outline: "border border-gray-200 bg-white",
    soft: "border border-white/70 bg-white/70",
  };

  return (
    <input
      className={cx(
        "w-full rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};

export default Input;
