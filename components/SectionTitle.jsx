export default function SectionTitle({ children, eyebrow }) {
  return (
    <div className="text-center">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-[3rem] xl:text-[3.2rem]">
        {children}
      </h2>
    </div>
  );
}
