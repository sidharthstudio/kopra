export default function Marquee({
  items,
  className = "",
  tone = "dark",
}: {
  items: string[];
  className?: string;
  tone?: "dark" | "ivory";
}) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span
            className={`whitespace-nowrap px-6 font-mono text-[0.68rem] font-medium uppercase tracking-[0.22em] ${
              tone === "dark" ? "text-brass-soft" : "text-scarlet-deep"
            }`}
          >
            {item}
          </span>
          <span aria-hidden="true" className={tone === "dark" ? "text-brass" : "text-scarlet"}>
            /
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden border-y py-4 ${
        tone === "dark" ? "border-[var(--line)] bg-[#0b0b0a]" : "border-[var(--line-dark)] bg-[var(--ivory-2)]"
      } ${className}`}
    >
      <div className="marquee">
        {row}
        {row}
      </div>
    </div>
  );
}
