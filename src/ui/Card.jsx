import { cx } from "./utils";

const Card = ({ className, children, variant = "glass", size = "md" }) => {
  const variants = {
    glass: "glass-panel",
    solid: "bg-white border border-white/70 shadow-md",
    outline: "bg-white/70 border border-black/10",
    elevated: "bg-white border border-white/70 shadow-lg",
  };

  const sizes = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <div className={cx("rounded-2xl", variants[variant], sizes[size], className)}>
      {children}
    </div>
  );
};

export default Card;
