import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const isPointerRef = useRef(false);
  const isHiddenRef = useRef(false);
  const isGalleryModalRef = useRef(false);
  const themeRef = useRef(() => {
    if (typeof document === 'undefined') return 'dark';
    return document.documentElement.dataset.theme || 'dark';
  });

  // Hide custom cursor on mobile devices
  const isMobile = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  useEffect(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    let rafId = null;

    const updateCursorStyle = () => {
      const isPointer = isPointerRef.current;
      const isHidden = isHiddenRef.current;
      const opacity = isHidden ? '0' : '1';
      
      cursor.style.opacity = opacity;
      cursorDot.style.opacity = opacity;
      
      cursor.style.width = isPointer ? '48px' : '36px';
      cursor.style.height = isPointer ? '48px' : '36px';
      cursor.style.marginLeft = isPointer ? '-24px' : '-18px';
      cursor.style.marginTop = isPointer ? '-24px' : '-18px';
      
      cursorDot.style.width = isPointer ? '6px' : '4px';
      cursorDot.style.height = isPointer ? '6px' : '4px';
      cursorDot.style.marginLeft = isPointer ? '-3px' : '-2px';
      cursorDot.style.marginTop = isPointer ? '-3px' : '-2px';
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check pointer state efficiently - avoid getComputedStyle
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.type === 'submit' ||
        target.type === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.classList.contains('cursor-pointer');
      
      if (isClickable !== isPointerRef.current) {
        isPointerRef.current = isClickable;
        updateCursorStyle();
      }
    };

    const handleMouseEnter = () => {
      isHiddenRef.current = false;
      updateCursorStyle();
    };

    const handleMouseLeave = () => {
      isHiddenRef.current = true;
      updateCursorStyle();
    };

    const handleGalleryModal = (e) => {
      isGalleryModalRef.current = !!(e.detail && e.detail.open);
    };

    const handleThemeChange = () => {
      themeRef.current = document.documentElement.dataset.theme || 'dark';
    };

    const animateCursor = () => {
      // Smooth follow for outer circle
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      // Faster follow for inner dot
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;

      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;

      rafId = requestAnimationFrame(animateCursor);
    };

    // Observer for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.type === 'attributes' && m.attributeName === 'data-theme') {
          handleThemeChange();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('gallery-modal', handleGalleryModal);

    rafId = requestAnimationFrame(animateCursor);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('gallery-modal', handleGalleryModal);
      observer.disconnect();
    };
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Outer Circle */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: '36px',
          height: '36px',
          marginLeft: '-18px',
          marginTop: '-18px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 255, 255, 0.4)',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)',
          backdropFilter: 'blur(4px)',
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.1), inset 0 0 8px rgba(255, 255, 255, 0.08)',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease',
          willChange: 'transform',
        }}
      />

      {/* Inner Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: '4px',
          height: '4px',
          marginLeft: '-2px',
          marginTop: '-2px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.6) 100%)',
          boxShadow: '0 0 8px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.2)',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s ease',
          willChange: 'transform',
        }}
      />

      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
        a, button, input, textarea, select, [role="button"], .cursor-pointer {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
