import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
}

export const FlipCard = ({ front, back }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="relative w-full h-full cursor-pointer perspective-1000"
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-full duration-700 preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute w-full h-full backface-hidden">{front}</div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          {back}
        </div>
      </div>
    </div>
  );
};

// FlipCardFront component
export const FlipCardFront = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`w-full h-full ${className || ""}`}>
      {children}
    </div>
  );
};

// FlipCardBack component
export const FlipCardBack = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`w-full h-full ${className || ""}`}>
      {children}
    </div>
  );
}; 