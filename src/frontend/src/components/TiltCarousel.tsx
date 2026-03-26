import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface CarouselImage {
  src: string;
  label: string;
  category: string;
}

interface TiltCarouselProps {
  images: CarouselImage[];
}

const CARD_WIDTH = 420;
const CARD_HEIGHT = Math.round(CARD_WIDTH * (4 / 3));
const CARD_GAP = 32;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const MAX_TILT = 6;
const MOMENTUM_FACTOR = 12;

export default function TiltCarousel({ images }: TiltCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [tilt, setTilt] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const drag = useRef({
    active: false,
    startX: 0,
    lastX: 0,
    velocity: 0,
    lastTime: 0,
    currentOffset: 0,
  });

  const getContainerWidth = () => containerRef.current?.offsetWidth ?? 0;

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(images.length - 1, index));
      setActiveIndex(clamped);
      setDragOffset(0);
      setTilt(0);
    },
    [images.length],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      drag.current = {
        active: true,
        startX: e.clientX,
        lastX: e.clientX,
        velocity: 0,
        lastTime: Date.now(),
        currentOffset: 0,
      };
      setIsDragging(true);
      setIsTransitioning(false);
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    },
    [],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!drag.current.active) return;
      const now = Date.now();
      const dt = Math.max(now - drag.current.lastTime, 1);
      const dx = e.clientX - drag.current.lastX;
      const velocity = (dx / dt) * 16;
      drag.current.velocity = velocity * 0.8 + drag.current.velocity * 0.2;
      drag.current.lastX = e.clientX;
      drag.current.lastTime = now;
      const offset = e.clientX - drag.current.startX;
      drag.current.currentOffset = offset;
      setDragOffset(offset);
      const tiltDeg = Math.max(
        -MAX_TILT,
        Math.min(MAX_TILT, -drag.current.velocity * 0.8),
      );
      setTilt(tiltDeg);
    },
    [],
  );

  const handlePointerUp = useCallback(
    (_e: React.PointerEvent<HTMLDivElement>) => {
      if (!drag.current.active) return;
      drag.current.active = false;
      setIsDragging(false);
      setIsTransitioning(true);

      const { velocity, currentOffset } = drag.current;
      const momentum = velocity * MOMENTUM_FACTOR;
      const totalOffset = currentOffset + momentum;
      const deltaIndex = Math.round(-totalOffset / CARD_STEP);

      setActiveIndex((prev) => {
        const next = Math.max(
          0,
          Math.min(images.length - 1, prev + deltaIndex),
        );
        return next;
      });
      setDragOffset(0);
      setTilt(0);

      setTimeout(() => setIsTransitioning(false), 600);
    },
    [images.length],
  );

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, goTo]);

  const containerWidth = getContainerWidth();
  const trackOffset =
    containerWidth / 2 - activeIndex * CARD_STEP - CARD_WIDTH / 2 + dragOffset;

  return (
    <section
      className="relative py-8 select-none overflow-hidden"
      aria-label="Fashion lookbook carousel"
    >
      {/* Drag area */}
      <div
        ref={containerRef}
        className="relative w-full cursor-grab active:cursor-grabbing"
        style={{ height: `${CARD_HEIGHT + 80}px` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        data-ocid="carousel.canvas_target"
      >
        {/* Track */}
        <div
          className="absolute top-0 flex"
          style={{
            left: 0,
            gap: `${CARD_GAP}px`,
            transform: `translateX(${trackOffset}px)`,
            transition: isDragging
              ? "none"
              : "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            willChange: "transform",
          }}
        >
          {images.map((image, index) => {
            const offset = index - activeIndex;
            const isActive = offset === 0;
            const isAdjacent = Math.abs(offset) === 1;
            const scale = isActive ? 1.02 : isAdjacent ? 0.94 : 0.88;
            const opacity = isActive ? 1 : isAdjacent ? 0.65 : 0.35;
            const rotateZ = isActive ? tilt : 0;
            const rotateY = isActive ? 0 : offset * 3;

            return (
              <button
                key={image.src}
                type="button"
                data-ocid={`carousel.item.${index + 1}`}
                className="relative flex-shrink-0 overflow-hidden p-0 border-0 bg-transparent"
                style={{
                  width: `${CARD_WIDTH}px`,
                  height: `${CARD_HEIGHT}px`,
                  transform: `scale(${scale}) rotateZ(${rotateZ}deg) rotateY(${rotateY}deg)`,
                  opacity,
                  transition: isDragging
                    ? "opacity 0.2s ease, scale 0.2s ease"
                    : "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.45s ease",
                  transformOrigin: "center bottom",
                  cursor: isActive
                    ? isDragging
                      ? "grabbing"
                      : "grab"
                    : "pointer",
                  perspective: "1000px",
                }}
                onClick={() => {
                  if (!isDragging && !isTransitioning) goTo(index);
                }}
                aria-label={`${image.label} — ${image.category}`}
              >
                <img
                  src={image.src}
                  alt={image.label}
                  className="w-full h-full object-cover"
                  draggable={false}
                  style={{ pointerEvents: "none" }}
                />
                {/* Caption overlay on active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="caption"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className="absolute bottom-0 left-0 right-0 px-6 py-4"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)",
                      }}
                    >
                      <span className="font-sans-ui text-white text-xs tracking-editorial uppercase">
                        {image.category}
                      </span>
                      <p className="font-display text-white text-lg font-light mt-0.5">
                        {image.label}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        type="button"
        data-ocid="carousel.pagination_prev"
        onClick={() => goTo(activeIndex - 1)}
        disabled={activeIndex === 0}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border border-rahi-black bg-rahi-cream/80 backdrop-blur-sm hover:bg-rahi-black hover:text-rahi-cream transition-colors duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
        aria-label="Previous image"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        type="button"
        data-ocid="carousel.pagination_next"
        onClick={() => goTo(activeIndex + 1)}
        disabled={activeIndex === images.length - 1}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border border-rahi-black bg-rahi-cream/80 backdrop-blur-sm hover:bg-rahi-black hover:text-rahi-cream transition-colors duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
        aria-label="Next image"
      >
        <ChevronRight size={16} />
      </button>

      {/* Dot pagination */}
      <div
        className="flex justify-center gap-2 mt-6"
        role="tablist"
        aria-label="Carousel pages"
      >
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            data-ocid="carousel.tab"
            role="tab"
            aria-selected={i === activeIndex}
            onClick={() => goTo(i)}
            className="transition-all duration-300"
            style={{
              width: i === activeIndex ? "24px" : "6px",
              height: "6px",
              background:
                i === activeIndex
                  ? "oklch(0.145 0 0)"
                  : "oklch(0.145 0 0 / 0.25)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
