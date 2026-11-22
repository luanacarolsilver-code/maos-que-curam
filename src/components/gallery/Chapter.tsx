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

export function Chapter({ chapter, index }: ChapterProps) {
  const number = String(index + 1).padStart(2, "0");
  const [viewer, setViewer] = useState<{ roomId: string; index: number } | null>(null);

  const imageCount = useMemo(
    () => chapter.rooms.reduce((n, room) => n + room.images.length, 0),
    [chapter.rooms],
  );

  const activeRoom = viewer
    ? chapter.rooms.find((room) => room.id === viewer.roomId)
    : null;

  const viewerItems: AccordionItem[] = useMemo(() => {
    if (!activeRoom) return [];
    return activeRoom.images.map((image) => ({
      image: image.src,
      label: image.caption,
      link: "#",
    }));
  }, [activeRoom]);

  return (
    <section id={chapter.id} className="scroll-mt-20 border-t border-line sm:scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <Reveal className="mb-8 grid gap-4 border-b border-line pb-6 sm:mb-10 sm:gap-6 sm:pb-8 md:mb-12 md:grid-cols-12 md:items-end md:gap-8 md:pb-10">
          <div className="flex items-baseline gap-3 sm:gap-5 md:col-span-9">
            <span className="font-display shrink-0 text-5xl leading-none text-sage/45 sm:text-6xl md:text-7xl">
              {number}
            </span>
            <div className="min-w-0">
              <p className="label text-wood">{chapter.block}</p>
              <h2 className="font-title mt-1.5 text-2xl tracking-tight text-wood-deep sm:mt-2 sm:text-3xl md:text-5xl">
                {chapter.title}
              </h2>
              <div className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                {chapter.subtitle.split("\n").map((line, i) => (
                  <p
                    key={i}
                    className={i === 0 ? "whitespace-nowrap max-md:whitespace-normal" : "mt-0"}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-3 md:text-right">
            <p className="label">
              {chapter.rooms.length}{" "}
              {chapter.rooms.length === 1 ? "ambiente" : "ambientes"} · {imageCount}{" "}
              {imageCount === 1 ? "imagem" : "imagens"}
            </p>
          </div>
        </Reveal>

        <div className="space-y-12 md:space-y-16">
          {chapter.rooms.map((room, roomIndex) => {
            const items: AccordionItem[] = room.images.map((image) => ({
              image: image.src,
              label: image.caption,
              link: "#",
            }));
            const defaultIndex = Math.min(
              Math.floor((items.length - 1) / 2),
              Math.max(items.length - 1, 0),
            );

            return (
              <div key={room.id} id={`${chapter.id}-${room.id}`} className="scroll-mt-28">
                <Reveal delay={roomIndex * 40}>
                  <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="label text-sage">Ambiente</p>
                      <h3 className="font-title mt-1 text-xl text-wood-deep sm:text-2xl md:text-3xl">
                        {room.title}
                      </h3>
                    </div>
                    <p className="label">
                      {room.images.length}{" "}
                      {room.images.length === 1 ? "imagem" : "imagens"}
                    </p>
                  </div>
                </Reveal>

                <Reveal variant="scale" delay={roomIndex * 40 + 40}>
                  <AccordionGallery
                    items={items}
                    defaultIndex={defaultIndex}
                    expandRatio={items.length <= 3 ? 0.62 : items.length >= 7 ? 0.42 : 0.5}
                    trigger="hover"
                    sectionLabel={room.title}
                    onOpen={(localIndex) =>
                      setViewer({ roomId: room.id, index: localIndex })
                    }
                  />
                </Reveal>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-sm text-muted">
          <span className="hidden md:inline">
            Passe o mouse para explorar · clique para abrir a visualização
          </span>
          <span className="md:hidden">Toque para expandir · toque de novo para abrir</span>
        </p>
      </div>

      {viewer && activeRoom && viewerItems.length > 0 && (
        <AccordionViewer
          items={viewerItems}
          index={viewer.index}
          sectionLabel={activeRoom.title}
          onClose={() => setViewer(null)}
          onChange={(index) => setViewer({ roomId: viewer.roomId, index })}
        />
      )}
    </section>
  );
}
