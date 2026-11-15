export default function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex flex-col leading-none">
      <span
        className={`font-display font-extrabold uppercase text-ivory ${
          compact ? "text-[1.05rem] tracking-[0.2em]" : "text-[1.2rem] tracking-[0.22em]"
        }`}
      >
        Kopra
      </span>
      <span className="mt-[5px] font-mono text-[6px] uppercase tracking-[0.24em] text-brass sm:text-[6.5px]">
        Non-alcoholic cocktail bar
      </span>
    </span>
  );
}
