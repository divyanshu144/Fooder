import { cx } from "./utils";

const Section = ({ className, title, subtitle, children, actions, size = "md" }) => {
  const sizes = {
    sm: "mt-6",
    md: "mt-10",
    lg: "mt-14",
  };

  return (
    <section className={cx(sizes[size], className)}>
      {(title || subtitle || actions) && (
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="mt-2 text-sm text-gray-600">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
};

export default Section;
