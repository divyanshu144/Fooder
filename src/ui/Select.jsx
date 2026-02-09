import { cx } from "./utils";

const Select = ({ className, children, size = "md", variant = "outline", ...props }) => {
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
    <select
      className={cx(
        "rounded-xl",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
