import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

import { chapters, totalImages } from "@/content/gallery";
import { Chapter } from "@/components/gallery/Chapter";
import { MobileNav } from "@/components/MobileNav";
import { Reveal } from "@/components/Reveal";

const HERO = "/gallery/fachada-2.png";

const stages = [
  { name: "Lagarta", text: "Acolhimento", href: "#lagarta" },
  { name: "Crisálida", text: "Criação", href: "#crisalida" },
  { name: "Borboleta", text: "Compartilhar", href: "#borboleta" },
];

export default function App() {
  const [heroShift, setHeroShift] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = Math.min(window.scrollY, window.innerHeight);
        setHeroShift(y * 0.28);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="min-h-svh overflow-x-hidden">
      <MobileNav />

      <header id="inicio" className="relative min-h-[100svh] overflow-hidden">
        <img
          src={HERO}
          alt="Fachada do Centro Terapêutico de Artesanato Mãos que Curam"
          className="absolute inset-0 h-[120%] w-full object-cover object-[62%_center] will-change-transform sm:object-center"
          style={{ transform: `translate3d(0, ${heroShift}px, 0)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/30" />
        <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-4 pb-12 pt-24 safe-bottom sm:px-6 sm:pb-16 md:pb-20">
          <Reveal
            className="mx-auto w-full max-w-7xl"
            variant="up"
            threshold={0.2}
            rootMargin="0px"
          >
            <p className="label text-cream/80">Galeria digital · TCC 2026</p>
            <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[0.9] text-cream sm:mt-4 sm:text-7xl md:text-8xl lg:text-9xl">
              Mãos
              <br />
              que Curam
            </h1>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-cream/85 sm:mt-6 sm:text-base md:text-lg">
              Centro Terapêutico de Artesanato para Mulheres em Tratamento Oncológico —
              Maringá–PR.
            </p>
            <a
              href="#galeria"
              className="mt-8 inline-flex min-h-11 items-center gap-3 border-b border-cream/70 pb-1 text-sm font-medium tracking-wide text-cream transition hover:border-cream hover:opacity-90 sm:mt-10"
            >
              Explorar as imagens <ArrowDown className="size-4 animate-bounce" />
            </a>
          </Reveal>
        </div>
      </header>

      <section id="galeria" className="scroll-mt-4 border-b border-line bg-paper/50 sm:scroll-mt-8">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 md:grid-cols-12 md:gap-8 md:py-20">
          <Reveal className="md:col-span-5" variant="up">
            <p className="label text-sage">O conceito</p>
            <h2 className="font-title mt-3 text-2xl text-wood-deep sm:text-3xl md:text-4xl">
              A Metamorfose
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              O percurso espacial acompanha a transformação: do acolhimento à criação, até o
              compartilhar. Abaixo, {totalImages} perspectivas complementares às pranchas.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-6 md:col-span-7 md:items-end">
            {stages.map((s, i) => (
              <Reveal key={s.name} delay={120 + i * 100} variant="up">
                <a
                  href={s.href}
                  className="group flex items-center justify-between gap-4 border-t border-line py-4 transition-colors hover:border-wood sm:block sm:pt-5 sm:pb-0"
                >
                  <div>
                    <span className="label text-sage">0{i + 1}</span>
                    <p className="font-title mt-1 text-xl italic text-wood-deep transition-colors group-hover:text-wood sm:mt-2 sm:text-2xl md:text-3xl">
                      {s.name}
                    </p>
                    <p className="mt-0.5 text-sm text-muted sm:mt-1">{s.text}</p>
                  </div>
                  <span className="label text-wood sm:hidden">Ver</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-30 border-b border-line bg-cream/90 backdrop-blur md:hidden safe-top">
        <div className="flex gap-2 overflow-x-auto px-4 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {chapters.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="shrink-0 border border-line bg-paper/70 px-3 py-2 text-xs font-medium tracking-wide text-ink whitespace-nowrap transition hover:border-wood hover:text-wood-deep"
            >
              {c.title}
            </a>
          ))}
        </div>
      </div>

      <main>
        {chapters.map((chapter, index) => (
          <Chapter key={chapter.id} chapter={chapter} index={index} />
        ))}
      </main>

      <footer className="bg-wood-deep text-cream safe-bottom">
        <Reveal
          className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16 md:flex-row md:items-end md:justify-between"
          variant="fade"
        >
          <div>
            <p className="font-display text-4xl sm:text-5xl md:text-6xl">Mãos que Curam</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/75">
              Casa de Artesanato · Centro Terapêutico de Artesanato para Mulheres em Tratamento
              Oncológico · Maringá–PR
            </p>
          </div>
          <div className="text-sm leading-relaxed text-cream/85 md:text-right">
            <p className="font-medium">Luana Caroline</p>
            <p>Arquitetura e Urbanismo · UNICIVE</p>
            <p>Trabalho de Conclusão de Curso · 2026</p>
          </div>
        </Reveal>
      </footer>
    </div>
  );
}
