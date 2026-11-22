import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { chapters } from "@/content/gallery";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav className="absolute inset-x-0 top-0 z-40 safe-top">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-4 px-4 py-4 sm:px-6 sm:py-5">
          <div className="hidden items-center gap-5 lg:flex">
            {chapters.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="label text-cream/75 transition-colors hover:text-cream"
              >
                {c.title}
              </a>
            ))}
          </div>

          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="flex size-11 items-center justify-center bg-cream/15 text-cream backdrop-blur-sm transition hover:bg-cream/25 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Fechar menu"
            className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[min(100%,20rem)] flex-col bg-cream shadow-2xl safe-top safe-bottom">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p className="font-display text-2xl text-wood-deep">Navegar</p>
              <button
                type="button"
                aria-label="Fechar"
                className="flex size-11 items-center justify-center text-ink"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 py-4">
              <a
                href="#inicio"
                className="block border-b border-line py-4 text-base text-ink"
                onClick={() => setOpen(false)}
              >
                Início
              </a>
              <a
                href="#galeria"
                className="block border-b border-line py-4 text-base text-ink"
                onClick={() => setOpen(false)}
              >
                Metamorfose
              </a>
              {chapters.map((c, i) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="block border-b border-line py-4"
                  onClick={() => setOpen(false)}
                >
                  <span className="label text-wood">
                    {String(i + 1).padStart(2, "0")} · {c.block}
                  </span>
                  <span className="font-title mt-1 block text-xl text-ink">{c.title}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
