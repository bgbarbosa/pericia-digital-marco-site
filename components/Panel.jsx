export default function Panel({ children, className = "", as = "div" }) {
  const Element = as;

  return (
    <Element
      className={`rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5 shadow-xl sm:p-7 md:rounded-[2rem] md:p-8 xl:p-9 ${className}`}
    >
      {children}
    </Element>
  );
}
