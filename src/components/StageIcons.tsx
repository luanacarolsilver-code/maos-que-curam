type StageIconProps = {
  name: "Lagarta" | "Crisálida" | "Borboleta";
  className?: string;
};

export function StageIcon({ name, className = "" }: StageIconProps) {
  if (name === "Lagarta") {
    return (
      <svg
        viewBox="0 0 120 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden
      >
        <path
          d="M14 34c4-10 10-14 16-12 5 2 7 9 12 9s8-7 13-8c5-1 9 5 14 6s9-5 14-4c4 1 7 6 11 7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18" cy="28" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16.5" cy="26.5" r="1" fill="currentColor" />
        <path
          d="M14 23c-2-5 1-9 4-10M22 23c2-5-1-9-3-10"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M36 40v4M48 41v4M61 40v4M74 41v4M87 40v4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="36" cy="32" r="2.2" fill="currentColor" opacity="0.45" />
        <circle cx="49" cy="33" r="2.2" fill="currentColor" opacity="0.45" />
        <circle cx="62" cy="32.5" r="2.2" fill="currentColor" opacity="0.45" />
        <circle cx="75" cy="33" r="2.2" fill="currentColor" opacity="0.45" />
      </svg>
    );
  }

  if (name === "Crisálida") {
    return (
      <svg
        viewBox="0 0 120 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden
      >
        <path
          d="M60 8c-1.5 4-1.5 7 0 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M54 10c4 1 8 1 12 0"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M60 18c-9 3-14 11-13 22 1 9 7 14 13 14s12-5 13-14c1-11-4-19-13-22z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M52 28c5 2 11 2 16 0M50 36c6 2.5 14 2.5 20 0M53 44c4.5 1.5 9.5 1.5 14 0"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 120 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M60 18c-1 8-1 16 0 28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M60 22c-8-10-22-12-28-6-5 5-2 14 6 18 6 3 14 2 22-4"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      <path
        d="M60 22c8-10 22-12 28-6 5 5 2 14-6 18-6 3-14 2-22-4"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      <path
        d="M60 32c-7-5-16-4-20 1-3 4 0 9 6 10 5 1 10-1 14-5"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinejoin="round"
      />
      <path
        d="M60 32c7-5 16-4 20 1 3 4 0 9-6 10-5 1-10-1-14-5"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinejoin="round"
      />
      <path
        d="M56 16c-2-5 0-9 2-11M64 16c2-5 0-9-2-11"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <circle cx="54" cy="5" r="1.2" fill="currentColor" />
      <circle cx="66" cy="5" r="1.2" fill="currentColor" />
    </svg>
  );
}
