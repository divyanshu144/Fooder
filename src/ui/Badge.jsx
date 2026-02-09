import { cx } from "./utils";

const Badge = ({ className, children, variant = "soft", size = "md" }) => {
  const variants = {
    soft: "bg-white/70 text-gray-700 border border-black/10",
    solid: "bg-black text-white",
    accent: "bg-orange-500 text-white",
  };

  const sizes = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-3 py-1",
    lg: "text-sm px-4 py-1.5",
  };

  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full font-semibold",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
