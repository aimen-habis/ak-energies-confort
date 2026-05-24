/**
 * AK Énergies Confort wordmark.
 * A gradient "AK" monogram tile + editorial lockup. Scales by height.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 230 40"
      className={className}
      role="img"
      aria-label="AK Énergies Confort"
    >
      <defs>
        <linearGradient id="ak-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF4D2E" />
          <stop offset="50%" stopColor="#FFB347" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>

      {/* Monogram tile */}
      <rect x="0" y="2" width="36" height="36" rx="11" fill="url(#ak-mark)" />
      <text
        x="18"
        y="27"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="17"
        fontWeight="800"
        fill="#0A0A0F"
      >
        AK
      </text>

      {/* Wordmark */}
      <text
        x="48"
        y="18"
        fontFamily="var(--font-display)"
        fontSize="15"
        fontWeight="800"
        letterSpacing="0.5"
        fill="#F4F4F5"
      >
        ÉNERGIES
      </text>
      <text
        x="48"
        y="33"
        fontFamily="var(--font-sans)"
        fontSize="11"
        fontWeight="500"
        letterSpacing="4.5"
        fill="#71717A"
      >
        CONFORT
      </text>
    </svg>
  );
}
