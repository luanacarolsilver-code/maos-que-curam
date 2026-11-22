import { useMemo, useState } from "react";
import type { GalleryChapter } from "@/content/gallery";
import { Reveal } from "@/components/Reveal";
import AccordionGallery, {
  AccordionViewer,
  type AccordionItem,
} from "@/components/gallery/AccordionGallery";

type ChapterProps = {
  chapter: GalleryChapter;
  index: number;
};

const CHUNK_SIZE = 5;

function chunkItems<T>(list: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += size) {
    out.push(list.slice(i, i + size));
  }
  return out;
}

export function Chapter({ chapter, index }: ChapterProps) {
  const number = String(index + 1).padStart(2, "0");
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const items: AccordionItem[] = useMemo(
    () =>
      chapter.images.map((image) => ({
        image: image.src,
        label: image.caption,
        link: "#",
      })),
    [chapter.images],
  );

  const rows = useMemo(() => chunkItems(items, CHUNK_SIZE), [items]);

  return (
    <section id={chapter.id} className="scroll-mt-20 border-t border-line sm:scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <Reveal className="mb-6 grid gap-4 border-b border-line pb-6 sm:mb-8 sm:gap-6 sm:pb-8 md:mb-12 md:grid-cols-12 md:items-end md:gap-8 md:pb-10">
          <div className="flex items-baseline gap-3 sm:gap-5 md:col-span-8">
            <span className="font-display shrink-0 text-5xl leading-none text-sage/45 sm:text-6xl md:text-7xl">
              {number}
            </span>
            <div className="min-w-0">
              <p className="label text-wood">{chapter.block}</p>
              <h2 className="font-title mt-1.5 text-2xl tracking-tight text-wood-deep sm:mt-2 sm:text-3xl md:text-5xl">
                {chapter.title}
              </h2>
            </div>
          </div>
          <div className="md:col-span-4 md:text-right">
            <p className="text-sm leading-relaxed text-muted md:text-base">{chapter.subtitle}</p>
            <p className="mt-2 label sm:mt-3">{chapter.images.length} imagens</p>
          </div>
        </Reveal>

        <div className="space-y-5 md:space-y-6">
          {rows.map((row, rowIndex) => {
            const offset = rowIndex * CHUNK_SIZE;
            const defaultIndex = Math.min(Math.floor((row.length - 1) / 2), row.length - 1);

            return (
              <Reveal key={`${chapter.id}-row-${rowIndex}`} variant="scale" delay={rowIndex * 60}>
                <AccordionGallery
                  items={row}
                  defaultIndex={defaultIndex}
                  expandRatio={row.length <= 3 ? 0.58 : 0.5}
                  trigger="hover"
                  sectionLabel={chapter.title}
                  onOpen={(localIndex) => setViewerIndex(offset + localIndex)}
                />
              </Reveal>
            );
          })}
        </div>

        <p className="mt-4 text-sm text-muted">
          <span className="hidden md:inline">
            Passe o mouse para explorar · clique para abrir a visualização
          </span>
          <span className="md:hidden">Toque para expandir · toque de novo para abrir</span>
        </p>
      </div>

      {viewerIndex !== null && (
        <AccordionViewer
          items={items}
          index={viewerIndex}
          sectionLabel={chapter.title}
          onClose={() => setViewerIndex(null)}
          onChange={setViewerIndex}
        />
      )}
    </section>
  );
}
