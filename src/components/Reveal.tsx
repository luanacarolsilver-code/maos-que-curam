import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** delay in ms — applied on enter */
  delay?: number;
  variant?: "up" | "fade" | "scale" | "left" | "right";
  threshold?: number;
  rootMargin?: string;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  threshold,
  rootMargin,
}: RevealProps) {
  const { ref, visible } = useInView<HTMLDivElement>({
    once: false,
    threshold,
    rootMargin,
  });

  return (
    <div
      ref={ref}
      className={`reveal reveal-${variant} ${visible ? "is-inview" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
