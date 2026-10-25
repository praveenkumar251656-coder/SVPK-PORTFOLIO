import React, { useRef, useState } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
  variant?: "primary" | "secondary" | "subtle";
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = "",
  href,
  variant = "primary",
  ariaLabel
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.12, y: middleY * 0.12 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none whitespace-nowrap shrink-0 text-xs sm:text-sm tracking-tight rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4263EB]";

  const variantStyles = {
    primary:
      "bg-[#151515] text-[#F7F5F0] hover:bg-[#252525] active:bg-[#000000] px-5 py-2.5 shadow-xs",
    secondary:
      "bg-transparent text-[#151515] border border-[rgba(21,21,21,0.22)] hover:border-[#151515] hover:bg-[rgba(21,21,21,0.04)] px-5 py-2.5",
    subtle:
      "bg-transparent text-[#4A4A4A] hover:text-[#151515] hover:bg-[rgba(0,0,0,0.03)] px-3 py-2"
  };

  const content = (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`
      }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className="inline-block text-decoration-none"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-block bg-transparent border-0 p-0"
    >
      {content}
    </button>
  );
};
