import { cx } from "./utils";

const Container = ({ className, children, size = "lg" }) => {
  const sizes = {
    sm: "max-w-3xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-none",
  };

  return (
    <div className={cx("mx-auto w-full px-4", sizes[size], className)}>
      {children}
    </div>
  );
};

export default Container;
