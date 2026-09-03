import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Opening = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const [isFinished, setIsFinished] = useState(() => {
    return sessionStorage.getItem("hasSeenOpening") === "true";
  });

  useEffect(() => {
    if (isFinished) {
      if (onComplete) onComplete();
      return;
    }

    sessionStorage.setItem("hasSeenOpening", "true");

    // Prevent scrolling during animation
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        setIsFinished(true);
        document.body.style.overflow = 'unset';
        if (onComplete) onComplete();
      }
    });

    // 1. Setup initial state
    gsap.set(containerRef.current, { visibility: "visible" });
    
    // Split text into individual characters for animation
    const textElement = textContainerRef.current;
    const text = textElement.innerText;
    textElement.innerHTML = '';
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char === ' ' ? '\u00A0' : char;
        span.className = 'inline-block translate-y-full opacity-0';
        textElement.appendChild(span);
    });

    const chars = textElement.children;

    // Animation: langsung muncul tulisan Portfolio tanpa counter
    tl.to(chars, {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        stagger: 0.04,
        ease: "expo.out",
    }, 0.3)
    // Hold it for a moment
    .to({}, { duration: 0.8 })
    // Stagger out the text
    .to(chars, {
        y: "-100%",
        opacity: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "expo.inOut",
    })
    // Pull the curtain up
    .to(containerRef.current, {
        y: "-100%",
        duration: 1.2,
        ease: "expo.inOut"
    });

    return () => {
        if (tl) tl.kill();
        document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  if (isFinished) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white invisible"
    >
        {/* Main Greeting Typography */}
        <div className="overflow-hidden flex items-center justify-center">
            <h1 
                ref={textContainerRef}
                className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight uppercase overflow-hidden py-2"
            >
                Portfolio
            </h1>
        </div>
    </div>
  );
};

export default Opening;