export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
}) {
  const alignment =
    align === 'left' ? 'text-left items-start' : 'text-center items-center';
  return (
    <div className={`flex flex-col ${alignment}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-montserrat text-[11px] font-bold uppercase tracking-[0.2em] ${
            light
              ? 'bg-white/10 text-[#8BE08B]'
              : 'bg-[#E9F4F1] text-[#217A4B]'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-5 max-w-3xl font-montserrat text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[44px] ${
          light ? 'text-white' : 'text-[#172546]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-[15px] leading-relaxed sm:text-base ${
            light ? 'text-[#E9F4F1]/80' : 'text-[#172546]/70'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}