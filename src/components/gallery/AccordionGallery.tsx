import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type AccordionItem = {
  image: string;
  label: string;
  link?: string;
};

type AccordionGalleryProps = {
  items: AccordionItem[];
  defaultIndex?: number;
  /** Fraction of total width for the expanded panel (0–1). */
  expandRatio?: number;
  trigger?: "hover" | "click";
  className?: string;
  sectionLabel?: string;
  /** If set, click opens parent-controlled viewer instead of the built-in one. */
  onOpen?: (index: number) => void;
};

export function AccordionViewer({
  items,
  index,
  onClose,
  onChange,
  sectionLabel,
}: {
  items: AccordionItem[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
  sectionLabel?: string;
}) {
  const item = items[index];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onChange(index - 1);
      if (e.key === "ArrowRight" && hasNext) onChange(index + 1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [hasNext, hasPrev, index, onChange, onClose]);

  if (!item) return null;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex flex-col bg-ink/90 backdrop-blur-xl safe-top safe-bottom"
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
      onTouchStart={(e) => {
        touchStartX.current = e.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchStartX.current;
        const end = e.changedTouches[0]?.clientX;
        touchStartX.current = null;
        if (start == null || end == null) return;
        const delta = end - start;
        if (Math.abs(delta) < 56) return;
        if (delta > 0 && hasPrev) onChange(index - 1);
        if (delta < 0 && hasNext) onChange(index + 1);
      }}
    >
      <img
        src={item.image}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-2xl transition-opacity duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/70 to-ink/90" />

      <header className="relative z-10 flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div>
          {sectionLabel && <p className="label text-cream/50">{sectionLabel}</p>}
          <p className="font-title mt-1 text-xl italic text-cream sm:text-2xl">{item.label}</p>
        </div>
        <button
          type="button"
          aria-label="Fechar"
          className="flex size-11 shrink-0 items-center justify-center bg-cream/95 text-ink transition hover:bg-cream"
          onClick={onClose}
        >
          <X className="size-5" />
        </button>
      </header>

      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-4 sm:px-8">
        {hasPrev && (
          <button
            type="button"
            aria-label="Anterior"
            className="absolute left-3 z-10 flex size-11 items-center justify-center bg-cream/95 text-ink transition hover:bg-cream sm:left-6"
            onClick={() => onChange(index - 1)}
          >
            <ChevronLeft className="size-5" />
          </button>
        )}
        {hasNext && (
          <button
            type="button"
            aria-label="Próxima"
            className="absolute right-3 z-10 flex size-11 items-center justify-center bg-cream/95 text-ink transition hover:bg-cream sm:right-6"
            onClick={() => onChange(index + 1)}
          >
            <ChevronRight className="size-5" />
          </button>
        )}

        <figure className="flex max-h-full w-full max-w-5xl flex-col items-center px-10 sm:px-14">
          <img
            key={item.image}
            src={item.image}
            alt={item.label}
            className="animate-fade-in max-h-[min(62vh,calc(100svh-14rem))] w-auto max-w-full object-contain shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            draggable={false}
          />
          <figcaption className="mt-4 text-center text-xs tracking-wider text-cream/55">
            {index + 1} / {items.length}
          </figcaption>
        </figure>
      </div>

      <div className="relative z-10 px-4 pb-5 sm:px-6 sm:pb-6">
        <div className="mx-auto flex h-16 max-w-4xl gap-1.5 sm:h-20 sm:gap-2">
          {items.map((thumb, i) => {
            const selected = i === index;
            return (
              <button
                key={`${thumb.image}-${i}`}
                type="button"
                aria-label={thumb.label}
                aria-current={selected}
                className="relative min-w-0 overflow-hidden transition-[flex-grow] duration-500 ease-out"
                style={{
                  flexGrow: selected ? 2.4 : 1,
                  flexBasis: 0,
                }}
                onClick={() => onChange(i)}
              >
                <img
                  src={thumb.image}
                  alt=""
                  className={`h-full w-full object-cover transition duration-500 ${
                    selected ? "opacity-100" : "opacity-55 hover:opacity-80"
                  }`}
                />
                {selected && <div className="absolute inset-x-0 bottom-0 h-0.5 bg-cream" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function AccordionGallery({
  items,
  defaultIndex = 0,
  expandRatio = 0.52,
  trigger = "hover",
  className = "",
  sectionLabel,
  onOpen,
}: AccordionGalleryProps) {
  const safeDefault = Math.min(Math.max(defaultIndex, 0), Math.max(items.length - 1, 0));
  const [active, setActive] = useState(safeDefault);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const sync = () => setIsCoarse(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const useHover = trigger === "hover" && !isCoarse;
  const collapsedShare = items.length > 1 ? (1 - expandRatio) / (items.length - 1) : 1;

  const activate = useCallback((index: number) => {
    setActive(index);
  }, []);

  const openViewer = useCallback(
    (index: number) => {
      setActive(index);
      if (onOpen) {
        onOpen(index);
        return;
      }
      setViewerIndex(index);
    },
    [onOpen],
  );

  if (items.length === 0) return null;

  return (
    <>
      <div
        className={`accordion-gallery flex h-[min(58vh,480px)] w-full gap-1.5 overflow-hidden sm:h-[min(68vh,560px)] sm:gap-2 md:h-[min(72vh,640px)] ${className}`}
        onMouseLeave={() => {
          if (useHover && viewerIndex === null) setActive(safeDefault);
        }}
      >
        {items.map((item, index) => {
          const isActive = index === active;
          const flexGrow = isActive ? expandRatio : collapsedShare;

          return (
            <button
              key={`${item.image}-${index}`}
              type="button"
              aria-label={`Ver ${item.label}`}
              aria-expanded={isActive}
              className="accordion-panel group relative min-w-0 cursor-pointer overflow-hidden bg-paper text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-wood"
              style={{
                flexGrow,
                flexBasis: 0,
                transition: "flex-grow 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              onMouseEnter={() => {
                if (useHover) activate(index);
              }}
              onFocus={() => activate(index)}
              onClick={() => {
                if (!useHover) {
                  if (isActive) openViewer(index);
                  else activate(index);
                  return;
                }
                openViewer(index);
              }}
            >
              <img
                src={item.image}
                alt={item.label}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition duration-700 ease-out ${
                  isActive ? "scale-100" : "scale-110"
                }`}
              />
              <div
                className={`absolute inset-0 transition duration-500 ${
                  isActive
                    ? "bg-gradient-to-t from-ink/70 via-ink/15 to-transparent"
                    : "bg-ink/35"
                }`}
              />

              <div
                className={`absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4 md:p-5 ${
                  isActive ? "opacity-100" : "opacity-90"
                }`}
              >
                {isActive ? (
                  <div>
                    <p className="font-title text-lg text-cream italic sm:text-2xl md:text-3xl">
                      {item.label}
                    </p>
                    <p className="mt-1 hidden text-xs tracking-wide text-cream/70 sm:block">
                      Clique para ampliar
                    </p>
                  </div>
                ) : (
                  <p
                    className="label max-h-[70%] overflow-hidden text-cream/90"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {item.label}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {viewerIndex !== null && !onOpen && (
        <AccordionViewer
          items={items}
          index={viewerIndex}
          sectionLabel={sectionLabel}
          onClose={() => setViewerIndex(null)}
          onChange={setViewerIndex}
        />
      )}
    </>
  );
}
